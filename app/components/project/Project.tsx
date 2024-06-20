import type { ModalState, SetUseState } from '@type/portfolioTypes';
import { motion } from 'framer-motion';

interface ProjectProps {
  index: number;
  title: string;
  type: string;
  setModal: (newState: ModalState) => void;
  setHoverProject: SetUseState;
}

const titleVariant = {
  hover: { opacity: '.5', x: 20 }
}

const typeVariant = {
  hover: { opacity: '.5', x: -20 }
}

export default function Project({ index, title, setModal, type, setHoverProject }: ProjectProps) {
  return (
    <motion.li
      whileHover='hover'
      className='w-full border-t border-[#a2a2a9]' 
      onMouseEnter={() => {setModal({active: true, index: index}); setHoverProject(true);}} 
      onMouseLeave={() => {setModal({active: false, index: index}); setHoverProject(false);}}
    >
      <a className="flex flex-row w-full items-center justify-between py-10 s:py-16 m:py-20" href='/music'>
      <motion.h3 variants={titleVariant} initial={{opacity: 1, x: 0}} className='text-3xl m:text-5xl transition-all duration-75'>{title}</motion.h3>
      <motion.p variants={typeVariant} initial={{opacity: 1, x: 0}} className='hidden s:block s:text-xl'>{type}</motion.p>
      </a>
    </motion.li>
  )
}
