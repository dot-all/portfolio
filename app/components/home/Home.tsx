import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

import Link from '@components/home/Link';
import AnimatedText from '@components/common/AnimatedText';

import type { LinkProps, SetUseState, TextVariant } from '@type/portfolioTypes';

const links: LinkProps[] = [
  {
    text: 'GITHUB',
    hiddenText: 'VISITA MI TRABAJO EN',
    href: 'https://github.com/im-allan/',
    className: 'col-start-1'
  },
  {
    text: 'LINKEDIN',
    hiddenText: 'CONTÁCTAME POR',
    href: 'https://www.linkedin.com/in/im-allan/',
    className: 'col-start-2 ml-auto s:mx-auto'
  }
]

const textVariant: TextVariant = {
  hidden: {
    y: 160
  },
  visible: {
    y: 0,
    transition: {
      duration: .8
    }
  }
};

const textVariantTwo: TextVariant = {
  hidden: {
    y: -160
  },
  visible: {
    y: 0,
    transition: {
      duration: 1,
      delay: .8
    }
  }
};

const textVariantThree: TextVariant = {
  hidden: {
    y: 160
  },
  visible: {
    y: 0,
    transition: {
      duration: 1
    }
  }
};


interface HomeProps {
  setHoverText: SetUseState;
}

export default function Home({ setHoverText }: HomeProps) {

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0], {
    clamp: false,
    ease: (progress) => 1 - Math.pow(1 - progress, 1),
  })

  const translateY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -100],
  )

  return (
    <section className='bg-[#111111] mb-[-100svh] py-0 mx-auto relative text-white' ref={ref} id="home">
      <div className='sticky top-0 w-10/12 mx-auto'>
        <motion.div style={{ opacity, y: translateY }} className='w-full h-svh relative flex items-center '>
          <AnimatedText once text="Allan Quiroz" className='absolute top-12 s:top-8 left-0 text-2xl s:text-3xl m:text-4xl font-roboto' textVariants={textVariantThree} />
          <div className='absolute flex flex-col right-0 bottom-20 font-roboto'>
            <motion.span
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              transition={{ duration: 1.3, ease: 'easeIn' }}
              className='text-base s:text-xl'
              >
              <AnimatedText once text='DISPONIBLE PARA TRABAJAR' textVariants={textVariantTwo}/>
            </motion.span>
            <span className='font-thin'>
              <AnimatedText once text='Con base en Chile' textVariants={textVariantTwo}/>
            </span>
          </div>
          <div className='grid grid-cols-2 m:grid-cols-3 grid-rows-1 absolute bottom-4 w-full h-auto font-roboto text-sm m:text-base'>
            {
              links.map((link, index) => ( <Link text={link.text} hiddenText={link.hiddenText} href={link.href} key={index} /> ))
            }
          </div>
          <motion.div className='flex flex-col'>
            <motion.h1 
              className='uppercase w-fit text-[40px] s:text-6xl m:text-home relative flex flex-col whitespace-nowrap leading-tighter tracking-tight font-lato font-black cursor-default'
              onMouseEnter={() => setHoverText(true)}
              onMouseLeave={() => setHoverText(false)}
            >
                <AnimatedText once text="DESARROLLADOR" textVariants={textVariant} />
                <AnimatedText once text="FULLSTACK" className='ml-8 s:ml-10 m:ml-12' textVariants={textVariant} />
            </motion.h1>

          </motion.div>
        </motion.div>
      </div>
      <div className='h-svh'></div>
    </section>
  )
}
