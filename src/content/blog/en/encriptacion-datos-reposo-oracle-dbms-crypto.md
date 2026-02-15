---
title: 'Data Encryption at Rest in Oracle Database with DBMS_CRYPTO'
description: 'Encrypt sensitive data in Oracle using DBMS_CRYPTO. A practical guide to PL/SQL and security.'
pubDate: '2026-02-15'
heroImage: '/blog-placeholder-1.jpg'
category: 'Cybersecurity'
tags: ['Oracle', 'DBMS_CRYPTO', 'PL/SQL', 'Security', 'Encryption', 'AES']
---

Security audits rigorously demand that sensitive data be encrypted **at rest**. Protecting the perimeter or implementing HTTPS is insufficient if an attacker gains access to the physical database files or backups. Ensuring this information is unreadable is fundamental to complying with standards like **ISO 27001** and current data protection laws.

In Oracle, the tool for this is `DBMS_CRYPTO`. Forget the old `DBMS_OBFUSCATION_TOOLKIT` (if you're still using it, we have a problem). `DBMS_CRYPTO` is the current standard: it supports AES, handles blocks well, and works natively with `RAW` and `BLOB`.

**An important detail:** You might wonder why not use **TDE (Transparent Data Encryption)**. TDE is excellent, but it requires the **Oracle Advanced Security** license, which is an additional cost on top of the Enterprise Edition. If there is no budget for that license, this manual implementation with `DBMS_CRYPTO` is the "rudimentary" but effective and **free** alternative that saves the day.

Let's see how to implement this using AES-256.

---

## What you need to know

To encrypt properly, we need three things:

1.  **Algorithm**: We will use **AES-256**. It is the industry standard. 256 bits of key are, effectively, impossible to brute-force today.
    *   `DBMS_CRYPTO.ENCRYPT_AES256`
2.  **Block Mode**: We will use **CBC** (Cipher Block Chaining).
    *   *Why:* In CBC, each encrypted block depends on the previous one. In ECB mode (which we must avoid), the same plain text always generates the same ciphertext, revealing patterns.
    *   `DBMS_CRYPTO.CHAIN_CBC`
3.  **Padding**: **PKCS5**.
    *   AES works in 16-byte blocks. If your text is not a multiple of 16, PKCS5 fills the rest.
    *   `DBMS_CRYPTO.PAD_PKCS5`

In PL/SQL, we sum these constants to configure our suite:

```sql
l_encryption_type := DBMS_CRYPTO.ENCRYPT_AES256
                   + DBMS_CRYPTO.CHAIN_CBC
                   + DBMS_CRYPTO.PAD_PKCS5;
```

---

## Hands On

For this example, we will use the classic **HR** schema that comes with Oracle. The requirement is clear: the `SALARY` field of the `EMPLOYEES` table is confidential and must be encrypted.

### 1. Preparation

To avoid breaking the original schema in this demo, we will work on a copy of the table.

```sql
-- Create a working copy
CREATE TABLE employees_sec AS
SELECT employee_id, first_name, last_name, salary
FROM   hr.employees;

-- Add column for encrypted data (RAW)
ALTER TABLE employees_sec ADD salary_enc RAW(2000);
```

### 2. Encryption Function

This function receives the data (as text) and the key. It is vital to explicitly convert to UTF-8 before encrypting to avoid encoding corruptions.

```sql
CREATE OR REPLACE FUNCTION fn_encrypt (
    p_plain_text   IN VARCHAR2,
    p_key_raw      IN RAW
) RETURN RAW
IS
    l_cipher_type     PLS_INTEGER := DBMS_CRYPTO.ENCRYPT_AES256
                                   + DBMS_CRYPTO.CHAIN_CBC
                                   + DBMS_CRYPTO.PAD_PKCS5;
    l_text_raw        RAW(2000);
BEGIN
    -- Text -> Bytes (UTF8)
    l_text_raw := UTL_I18N.STRING_TO_RAW(p_plain_text, 'AL32UTF8');

    RETURN DBMS_CRYPTO.ENCRYPT(
        src => l_text_raw,
        typ => l_cipher_type,
        key => p_key_raw
    );
END fn_encrypt;
/
```

### 3. Decryption Function

Receives the encrypted bytes and returns the original text.

```sql
CREATE OR REPLACE FUNCTION fn_decrypt (
    p_encrypted_text IN RAW,
    p_key_raw        IN RAW
) RETURN VARCHAR2
IS
    l_cipher_type     PLS_INTEGER := DBMS_CRYPTO.ENCRYPT_AES256
                                   + DBMS_CRYPTO.CHAIN_CBC
                                   + DBMS_CRYPTO.PAD_PKCS5;
    l_text_raw        RAW(2000);
BEGIN
    l_text_raw := DBMS_CRYPTO.DECRYPT(
        src => p_encrypted_text,
        typ => l_cipher_type,
        key => p_key_raw
    );

    -- Bytes -> Text (UTF8)
    RETURN UTL_I18N.RAW_TO_CHAR(l_text_raw, 'AL32UTF8');
END fn_decrypt;
/
```

### 4. Execution (Backfilling the data)

Here comes the magic. We will take the existing salaries, convert them to text (`TO_CHAR`), encrypt them, and store them in the new column. Then, we "delete" the original data to simulate compliance.

```sql
DECLARE
    -- ⚠️ IN PRODUCTION: Key in Wallet or Vault. Here just for demo.
    l_key    RAW(32) := UTL_I18N.STRING_TO_RAW('MySecretKey32BytesSafe!2026', 'AL32UTF8');
BEGIN
    -- 1. Mass encrypt
    UPDATE employees_sec
    SET    salary_enc = fn_encrypt(TO_CHAR(salary), l_key);
    
    -- 2. "Delete" the plain column to comply with standards
    -- (In real life we would do a DROP COLUMN after validating)
    UPDATE employees_sec
    SET    salary = NULL;

    COMMIT;

    -- 3. Verify by decrypting
    FOR rec IN (SELECT first_name, salary_enc FROM employees_sec WHERE ROWNUM <= 5) LOOP
        DBMS_OUTPUT.PUT_LINE('Emp: ' || rec.first_name);
        -- Convert back to numeric if necessary
        DBMS_OUTPUT.PUT_LINE('Recovered Salary: ' || fn_decrypt(rec.salary_enc, l_key));
        DBMS_OUTPUT.PUT_LINE('---');
    END LOOP;
END;
/
```

---

## Two Critical Topics

### 1. The IV (Initialization Vector)
The example above is functional but has a security flaw: if I encrypt "Hello" twice with the same key, the result is identical. This allows statistical attacks.

The solution is to use a **random IV** every time you encrypt. Generate 16 random bytes (`DBMS_CRYPTO.RANDOMBYTES`), pass them to `ENCRYPT`, and store that IV along with the encrypted data (concatenated at the beginning, for example). When decrypting, extract the IV and use it. **Do this if security is critical.**

### 2. Key Management
Having the key in the code or in a `CONFIG` table is like leaving the key in the lock.

*   **Basic Level:** Use `Oracle Wallet`.
*   **Pro Level:** Use `Oracle Key Vault` or an external HSM.

The key must live separate from the data. Always.

## Summary

Implementing `DBMS_CRYPTO` isn't hard; what's hard is properly managing keys and policies. Start here, secure your `RAW`s, use AES-256 and please, rotate your keys once in a while.
