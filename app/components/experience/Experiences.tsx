import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

import Experience from '@components/experience/Experience';
import AnimatedText from '@components/common/AnimatedText';

import type { SetUseState, TextVariant } from '@type/portfolioTypes';

const experiences = [
  {
    id: 1,
    title: 'AFISAN',
    date: '2024',
    description: 'Encargado de realizar el análisis de requerimientos en el ámbito financiero-contable y de desarrollar soluciones algorítmicas y de interfaz de usuario para satisfacer las necesidades identificadas.',
    position: 'Ingeniero en Informática',
    method: ['MVC', 'POO', 'KANBAN'],
    top: 'calc(20vh + 0vh)',
    bottom: '24vh'
  },
  {
    id: 2,
    title: 'UNITTI',
    date: '2022',
    description: 'Líder del despliegue de componentes web para una interfaz de usuario que permite la identificación de objetos en imágenes mediante modelos. Aumento del 70% en la eficiencia operativa. Implementación de estrategias de automatización y estandarización de procesos.',
    position: 'Fullstack Engineer',
    method: ['MVC', 'POO', 'SCRUM'],
    top: 'calc(20vh + 8vh)',
    bottom: '16vh'
  },
  {
    id: 3,
    title: 'ALLOXENTRIC',
    date: '2022',
    description: 'Encargado del desarrollo e implementación de componentes web en la plataforma. Implementación de componente que permite identificar características de un audio mediante un modelo, con un rendimiento del 98%.',
    position: 'Fullstack Engineer',
    method: ['MVC', 'POO', 'SCRUM'],
    top: 'calc(20vh + 16vh)',
    bottom: '8vh'
  },
  {
    id: 3,
    title: 'APOLINAV',
    date: '2021',
    description: 'Responsable del mantenimiento y despliegue de la plataforma de información, incluyendo la optimización de estilos, accesibilidad y diseño mediante la implementación de responsive design para mejorar la experiencia de usuario.',
    position: 'Frontend Engineer',
    method: ['MVC', 'POO', 'SCRUM'],
    top: 'calc(20vh + 24vh)',
    bottom: '0vh'
  },

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

export default function Experiences() {
  const target = useRef<HTMLHeadingElement>(null);

  const { scrollYProgress } = useScroll({ target });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [-40, 10]
  );


  return (
    <section id='experiences'
      className='relative transition-color duration-0 z-10 drop-shadow w-full bg-[#111111] text-white'
    >    
      <div className='w-10/12 mx-auto pb-24'>
        <motion.h2
          ref={target}
          className='text-5xl m:text-8xl font-lato font-black pt-28 pb-6 uppercase transition-all duration-500 w-fit'
          style={{ y }}
          >
          <AnimatedText once text="EXPERIENCIA" textVariants={textVariant} />
        </motion.h2>
        <div className='mt-12 flex flex-col justify-between gap-y-20 pb-20'>
          {experiences.map((experience, index) => (
            <Experience key={index} title={experience.title} date={experience.date} description={experience.description} position={experience.position} method={experience.method} top={experience.top} bottom={experience.bottom} />
          ))}
        </div>
      </div>
    </section>
    )
}