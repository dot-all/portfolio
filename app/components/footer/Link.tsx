import { motion } from "framer-motion"

const svgVariant = {
  hover: { rotate: 0 }
}

interface LinkProps {
  content: string;
  href: string;
}

export default function Link({ content, href }: LinkProps) {
  return (
    <motion.a 
      className="relative text-base s:text-lg w-fit flex after:flex after:content-[''] after:absolute after:h-[1px] after:bottom-0 after:bg-white after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-bottom-left"
      href={href}
      target='_blank'
      whileHover='hover'
    >
      {content}
      <motion.svg initial={{rotate: -35}} variants={{...svgVariant}} transition={{duration: .3}} xmlns="http://www.w3.org/2000/svg" className="w-4 mt-1 ml-1 font-medium" viewBox="0 0 512 512">
        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="38" d="M268 112l144 144-144 144M392 256H10"/>
      </motion.svg>
    </motion.a>
  )
}
