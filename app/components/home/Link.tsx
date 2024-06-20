import { motion } from "framer-motion";

import type { LinkProps } from "@type/portfolioTypes";

const svgVariant = {
  hover: { rotate: 0 }
}

export default function Link({text, hiddenText, className, href}: LinkProps) {
  return (
    <motion.a 
      animate={{opacity: 1}}
      className={`relative w-fit flex after:flex after:content-[''] after:absolute after:h-[1px] after:bottom-0 after:bg-white after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-bottom-left ${className}`}
      href={href}
      initial={{opacity: 0}} 
      target='_blank'
      transition={{ delay: 1.4, duration: .6 }}
      whileHover='hover'
    >
      {/*  */}
      <span className='hidden s:flex mr-1'>{hiddenText}</span> {text}
      <motion.svg initial={{rotate: -35}} variants={{...svgVariant}} transition={{duration: .3}} xmlns="http://www.w3.org/2000/svg" className="w-4 my-auto ml-1" viewBox="0 0 512 512">
        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="38" d="M268 112l144 144-144 144M392 256H10"/>
      </motion.svg>
    </motion.a>
  )
}
