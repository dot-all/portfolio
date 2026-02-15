---
title: 'Encriptación de Datos en Reposo en Oracle Database con DBMS_CRYPTO'
description: 'Cifra datos sensibles en Oracle con DBMS_CRYPTO. Guía práctica de PL/SQL y seguridad.'
pubDate: '2026-02-15'
heroImage: '/blog-placeholder-1.jpg'
category: 'Ciberseguridad'
tags: ['Oracle', 'DBMS_CRYPTO', 'PL/SQL', 'Seguridad', 'Cifrado', 'AES']
---

Las auditorías de seguridad exigen rigurosamente que los datos sensibles estén cifrados **en reposo** (o *at rest*). Proteger el perímetro o implementar HTTPS es insuficiente si un atacante logra acceder a los archivos físicos de la base de datos o a los respaldos. Garantizar que esta información sea ilegible es fundamental para cumplir con estándares como la **ISO 27001** y las leyes vigentes de protección de datos.

En Oracle, la herramienta para esto es `DBMS_CRYPTO`. Olvida el viejo `DBMS_OBFUSCATION_TOOLKIT` (si aún lo usas, tenemos un problema). `DBMS_CRYPTO` es el estándar actual: soporta AES, gestiona bien los bloques y trabaja nativamente con `RAW` y `BLOB`.

**Un detalle importante:** Quizás te preguntes por qué no usar **TDE (Transparent Data Encryption)**. TDE es excelente, pero requiere la licencia **Oracle Advanced Security**, que es un costo adicional sobre la Enterprise Edition. Si no hay presupuesto para esa licencia, esta implementación manual con `DBMS_CRYPTO` es la alternativa "rudimentaria" pero efectiva y **gratuita** que nos salva el día.

Veamos cómo implementar esto utilizando AES-256.

---

## Lo que necesitas saber

Para cifrar bien, necesitamos tres cosas:

1.  **Algoritmo**: Usaremos **AES-256**. Es el estándar de industria. 256 bits de clave son, hoy por hoy, fuerza bruta imposible.
    *   `DBMS_CRYPTO.ENCRYPT_AES256`
2.  **Modo de Bloque**: Usaremos **CBC** (Cipher Block Chaining).
    *   *Por qué:* En CBC, cada bloque cifrado depende del anterior. En el modo ECB (el que debemos evitar), el mismo texto plano siempre genera el mismo cifrado, lo cual revela patrones.
    *   `DBMS_CRYPTO.CHAIN_CBC`
3.  **Padding**: **PKCS5**.
    *   AES funciona en bloques de 16 bytes. Si tu texto no es múltiplo de 16, PKCS5 rellena el resto.
    *   `DBMS_CRYPTO.PAD_PKCS5`

En PL/SQL, sumamos estas constantes para configurar nuestra suite:

```sql
l_encryption_type := DBMS_CRYPTO.ENCRYPT_AES256
                   + DBMS_CRYPTO.CHAIN_CBC
                   + DBMS_CRYPTO.PAD_PKCS5;
```

---

## Manos a la obra

Para este ejemplo usaremos el clásico esquema **HR** que viene en Oracle. El requerimiento es claro: el campo `SALARY` de la tabla `EMPLOYEES` es confidencial y debe estar cifrado.

### 1. Preparación

Para no romper el esquema original en esta demo, trabajaremos sobre una copia de la tabla.

```sql
-- Creamos una copia de trabajo
CREATE TABLE employees_sec AS
SELECT employee_id, first_name, last_name, salary
FROM   hr.employees;

-- Agregamos la columna para el dato cifrado (RAW)
ALTER TABLE employees_sec ADD salary_enc RAW(2000);
```

### 2. Función de Encriptar

Esta función recibe el dato (como texto) y la clave. Es vital convertir explícitamente a UTF-8 antes de cifrar para evitar corrupciones de encoding.

```sql
CREATE OR REPLACE FUNCTION fn_encriptar (
    p_texto_plano  IN VARCHAR2,
    p_clave_raw    IN RAW
) RETURN RAW
IS
    l_tipo_cifrado    PLS_INTEGER := DBMS_CRYPTO.ENCRYPT_AES256
                                   + DBMS_CRYPTO.CHAIN_CBC
                                   + DBMS_CRYPTO.PAD_PKCS5;
    l_texto_raw       RAW(2000);
BEGIN
    -- Texto -> Bytes (UTF8)
    l_texto_raw := UTL_I18N.STRING_TO_RAW(p_texto_plano, 'AL32UTF8');

    RETURN DBMS_CRYPTO.ENCRYPT(
        src => l_texto_raw,
        typ => l_tipo_cifrado,
        key => p_clave_raw
    );
END fn_encriptar;
/
```

### 3. Función de Desencriptar

Recibe los bytes cifrados y nos devuelve el texto original.

```sql
CREATE OR REPLACE FUNCTION fn_desencriptar (
    p_texto_cifrado  IN RAW,
    p_clave_raw      IN RAW
) RETURN VARCHAR2
IS
    l_tipo_cifrado    PLS_INTEGER := DBMS_CRYPTO.ENCRYPT_AES256
                                   + DBMS_CRYPTO.CHAIN_CBC
                                   + DBMS_CRYPTO.PAD_PKCS5;
    l_texto_raw       RAW(2000);
BEGIN
    l_texto_raw := DBMS_CRYPTO.DECRYPT(
        src => p_texto_cifrado,
        typ => l_tipo_cifrado,
        key => p_clave_raw
    );

    -- Bytes -> Texto (UTF8)
    RETURN UTL_I18N.RAW_TO_CHAR(l_texto_raw, 'AL32UTF8');
END fn_desencriptar;
/
```

### 4. Ejecución (Rellenando la data)

Aquí viene la magia. Tomaremos los salarios existentes, los convertiremos a texto (`TO_CHAR`), los cifraremos y guardaremos en la nueva columna. Luego, "borramos" el dato original para simular el cumplimiento.

```sql
DECLARE
    -- ⚠️ EN PRODUCCIÓN: Clave en Wallet o Vault. Aquí solo para demo.
    l_clave  RAW(32) := UTL_I18N.STRING_TO_RAW('MiClaveSecretaDe32BytesSeg!2026', 'AL32UTF8');
BEGIN
    -- 1. Ciframos masivamente
    UPDATE employees_sec
    SET    salary_enc = fn_encriptar(TO_CHAR(salary), l_clave);
    
    -- 2. "Eliminamos" la columna plana para cumplir la norma
    -- (En la vida real haríamos un DROP COLUMN después de validar)
    UPDATE employees_sec
    SET    salary = NULL;

    COMMIT;

    -- 3. Verificamos desencriptando
    FOR rec IN (SELECT first_name, salary_enc FROM employees_sec WHERE ROWNUM <= 5) LOOP
        DBMS_OUTPUT.PUT_LINE('Emp: ' || rec.first_name);
        -- Convertimos de vuelta a numérico si fuera necesario
        DBMS_OUTPUT.PUT_LINE('Salario Recuperado: ' || fn_desencriptar(rec.salary_enc, l_clave));
        DBMS_OUTPUT.PUT_LINE('---');
    END LOOP;
END;
/
```

---

## Dos temas críticos

### 1. El IV (Vector de Inicialización)
El ejemplo de arriba es funcional pero tiene un defecto en seguridad: si cifro dos veces "Hola" con la misma clave, el resultado es idéntico. Eso permite ataques estadísticos.

La solución es usar un **IV aleatorio** cada vez que cifras. Generas 16 bytes aleatorios (`DBMS_CRYPTO.RANDOMBYTES`), se los pasas al `ENCRYPT`, y guardas ese IV junto con el dato cifrado (concatenado al inicio, por ejemplo). Al desencriptar, separas el IV y lo usas. **Házlo si la seguridad es crítica.**

### 2. Gestión de Claves (Key Management)
Tener la clave en el código o en una tabla `CONFIG` es como dejar la llave puesta en la cerradura.

*   **Nivel Básico:** Usa `Oracle Wallet`.
*   **Nivel Pro:** Usa `Oracle Key Vault` o un HSM externo.

La clave debe vivir separada de los datos. Siempre.

## En resumen

Implementar `DBMS_CRYPTO` no es difícil, lo difícil es gestionar bien las claves y políticas. Empieza por aquí, asegura tus `RAW`s, usa AES-256 y por favor, rota tus claves de vez en cuando.
