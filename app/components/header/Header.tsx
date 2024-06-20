import { useState } from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";

const links = [
  { name: "Inicio", to: "#home", id: 1 },
  { name: "Experiencia", to: "#experiences", id: 2 },
  { name: "Portafolio", to: "#projects", id: 3 },
  { name: "Acerca de mí", to: "#about-me", id: 4 },
  { name: "Contacto", to: "#contact", id: 5 }
];

const itemVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1 }
};

const sideVariants = {
  closed: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: -1
    }
  },
  open: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: 1
    }
  }
};

const cvVariants = {
  closed: {
    opacity: 0,
    transition: {
      delay: .8,
      duration: .4
    }
  },
  open: {
    opacity: 1,
    transition: {
      duration: .4
    }
  }
}


export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.aside
          className="h-screen fixed z-20"
          initial={{ width: 0, height: 0 }}
          animate={{
            width: '100%',
            height: '100%',
            transition: { duration: 0.25 }
            }}
            exit={{
              width: 0,
              transition: { delay: 1, duration: 0.8 }
            }}
            >
            <motion.div
              className="w-full backdrop-blur bg-black/95 h-screen flex items-start justify-center overflow-hidden flex-col gap-2"
              initial="closed"
              animate="open"
              exit="closed"
              variants={sideVariants}
              >
                <nav className="sticky top-300 flex flex-col h-1/2">
                  {links.map(({ name, to, id }) => (
                    <motion.a
                      className="text-3xl s:text-4xl m:text-6xl ml-10 text-white hover:text-white/60"
                      key={id}
                      href={to}
                      whileHover={{ translateX: 20, transition: { duration: .2} }}
                      variants={itemVariants}
                      onClick={(event) => {
                        event.preventDefault();
                        setOpen(!open);
                        
                        const targetSection = document.querySelector(to);
                        if (targetSection) {
                          targetSection.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      >
                        {name}
                      </motion.a>
                    ))}
                </nav>
                <motion.a 
                  variants={cvVariants}
                  className="text-white absolute bottom-32 m:bottom-10 right-10 text-base s:text-xl py-4 px-8 border border-white rounded font-bold hover:text-white/60 hover:border-white/60"  href="cv/quiroz_allan_cv.pdf" download>DESCARGA CV</motion.a>
              </motion.div>
            </motion.aside>
        )}
      </AnimatePresence>
      <motion.header initial={{opacity: 0}} animate={{ opacity: 1 }} transition={{ duration: .5, delay: 1.5 }} className='w-[99%] fixed flex items-end h-20 justify-end left-1/2 transform -translate-x-1/2 z-20 pointer-events-none'>
        <motion.button onClick={() => {setOpen(!open)}} className="flex flex-row items-center justify-center p-2 pointer-events-auto">
          <motion.span className={`text-sm font-semibold transition-all-all duration-1000 text-white ${ open ? 'text-white' : '' }`}>MENU</motion.span>
          <svg className={`h-7 transition-all duration-1000 ${ open ? 'fill-white rotate-90' : 'fill-white' }`} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M14.001 7.8a2.2 2.2 0 1 0 0 4.402A2.2 2.2 0 0 0 14 7.8zm-8 0a2.2 2.2 0 1 0 0 4.402A2.2 2.2 0 0 0 6 7.8z"></path>
            </g>
          </svg>
        </motion.button>
      </motion.header>

    </>
  )
}




