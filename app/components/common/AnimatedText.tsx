import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import type { TextVariant } from '@type/portfolioTypes';

interface AnimatedTextProps {
  text: string | string[];
  once?: boolean;
  className?: string;
  textVariants: TextVariant;
}

export default function AnimatedText({ text, once, className, textVariants }: AnimatedTextProps) {
  const textArray = Array.isArray(text) ? text : [text];
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5, once });

  return (
    <>
      <span className='sr-only'>{text}</span>
      <motion.span
        animate={isInView ? 'visible': 'hidden'}
        aria-hidden
        className={`inline-block overflow-hidden ${className}`}
        initial='hidden'
        ref={ref}
        transition={{staggerChildren: 0.05}}
      >
        {textArray.map((line, index) => (
          <span className='block' key={index}>
            {line.split(' ').map((word, index) => (
              <span className='inline-block' key={index}>
                {word.split('').map((char, charIndex) => (
                  <motion.span
                    className='inline-block'
                    key={charIndex}
                    variants={textVariants}
                  >
                    {char}
                  </motion.span>
                ))}
                <span className='inline-block'>&nbsp;</span>
              </span>
            ))}
          </span>
        ))}
      </motion.span>
    </>
  )
}
