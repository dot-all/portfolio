import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import type { SetUseState } from "@type/portfolioTypes";

const data = [
  {
    question: 'Acerca de mí',
    answer: "Mi nombre es Allan Quiroz Silva y mi pasión por la programación nació a los 10 años con Blender Game Engine, donde creé mi primer videojuego. Desde entonces, mi camino ha sido un constante aprendizaje y búsqueda de la mejora continua. He participado en Hackathones organizadas por mi casa de estudio, donde he tenido la oportunidad de trabajar en equipos multidisciplinarios para desarrollar productos innovadores. Estas experiencias me han permitido fortalecer mis habilidades de colaboración, comunicación y resolución de problemas. \nComo programador, mi objetivo principal es convertir las ideas de los usuarios en una realidad tangible, utilizando mis habilidades y conocimientos para crear soluciones tecnológicas que sean eficientes, intuitivas y satisfagan sus necesidades. Estoy siempre abierto a nuevos desafíos y oportunidades para seguir aprendiendo y creciendo como profesional. Si tienes un proyecto en mente, no dudes en contactarme."
  },

]

const accordionVariant = {
  hover: {
    color: '#ffffff66',
    stroke: '#ffffff66'
  }
}

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const AccordionItem = ({ question, answer, isOpen, onClick }: AccordionItemProps) => {
  const contentParagraphs = answer.split('\n');

  const contentHeight = useRef<HTMLDivElement>(null);

  const containerHeight = contentHeight.current ? contentHeight.current.scrollHeight : 0;

  return (
    <motion.div className="border-b border-white overflow-hidden" whileHover='hover'>
      <button
        className='w-full text-left py-5 px-3 flex items-center justify-between bg-[#111111] cursor-pointer'
        onClick={onClick}
      >
        <motion.p initial={{color: '#ffffff'}} variants={{...accordionVariant}} className="text-3xl m:text-5xl transition-all duration-75 py-5 m:py-16">{question}</motion.p>
        <svg xmlns="http://www.w3.org/2000/svg" className={`w-7 s:w-8 m:w-10 transition-all duration-500 hover:stroke-white/50 ${isOpen ? 'rotate-180' : 'rotate-0'}`} viewBox="0 0 512 512"><motion.path initial={{stroke: '#ffffff'}} variants={{...accordionVariant}} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="40" d="M112 184l144 144 144-144"/></svg>
      </button>

      <div
        ref={contentHeight}
        className="px-4 transition-all duration-700 ease-in-out text-pretty"
        style={
          isOpen
            ? { height: containerHeight }
            : { height: "0px" }
        }
      >
        {contentParagraphs.map((paragraph, index) => (
          <p key={index} className="text-lg m:text-xl pb-16">{paragraph}</p>
        ))}
      </div>
    </motion.div>
  );
};


interface DataItem {
  question: string;
  answer: string;

}

interface AccordionProps {
  setHoverAbout: SetUseState;
}
const Accordion = ({setHoverAbout}: AccordionProps) => {
  const [activeIndex, setActiveIndex] = useState<number| null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [mouseEntered, setMouseEntered] = useState<boolean>(false);

  const handleItemClick = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
    setOpen((prevState) => !prevState);
  };

  const handleMouseEnter = () => {
    setMouseEntered(true);
    if (open) {
      setHoverAbout(false)
    } else {
      setHoverAbout(true);
    }
  }

  useEffect(() => {
    if (mouseEntered) {
      handleMouseEnter();
    } 
  }, [open, mouseEntered, setHoverAbout]);

  return (
    <div className="w-10/12 mx-auto mt-24" onMouseEnter={() => {handleMouseEnter();}} onMouseLeave={() => {setHoverAbout(false)}}>
      {data.map((item: DataItem, index: number) => (
        <AccordionItem
          key={index}
          question={item.question}
          answer={item.answer}
          isOpen={activeIndex === index}
          onClick={() => {handleItemClick(index); setOpen(!open);}}
        />
      ))}
    </div>
  );
};

export default Accordion;
