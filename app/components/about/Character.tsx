import { useScroll, useTransform, motion, MotionValue } from 'framer-motion';
import { useRef } from 'react';

interface CharacterProps {
  paragraph: string;
}

export default function Character({paragraph}: CharacterProps) {

  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.25"]
  })

  const words = paragraph.split(" ")
  return (
    <p 
      ref={container}         
      className='flex text-white flex-wrap'
    >
    {
      words.map( (word, i) => {
        const start = i / words.length
        const end = start + (1 / words.length)
        return <Word key={i} progress={scrollYProgress} range={[start, end]}>{word}</Word>
      })
    }
    </p>
  )
}

interface WordProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Word = ({children, progress, range}: WordProps) => {
  const amount = range[1] - range[0]

  const step = amount / children.length
  return (
    <span className='relative pr-1 s:pr-2 m:pr-3'>
      {
        children.split("").map((char, i) => {
          const start = range[0] + (i * step);
          const end = range[0] + ((i + 1) * step)
          return <Char key={`c_${i}`} progress={progress} range={[start, end]}>{char}</Char>
        })
      }
    </span>
  )
}

interface CharProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Char = ({children, progress, range}: CharProps) => {
  const opacity = useTransform(progress, range, [0,1])
  return (
    <span>
      <span className='absolute text-white/20'>{children}</span>
      <motion.span style={{opacity: opacity}}>{children}</motion.span>
    </span>
  )
}