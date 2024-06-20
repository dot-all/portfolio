import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";


const cursorVariants = {
  initial: {
    width: 10,
    height: 10,
    backgroundColor: '#ffffff',
    opacity: 1,
    transition: { opacity: { delay: .1 } }
  },
  hover: {
    width: 80,
    height: 80,
    backgroundColor: '#ffffffcc',
  },
  project: {
    opacity: 0
  },
  text: {
    width: 300,
    height: 300,
  }
}

const labelVariants = {
  initial: {
    width: 0,
    height: 0,
    opacity: 0,
  },
  hover: {
    width: 80,
    height: 80,
    opacity: 1
  }
}

interface CursorProps {
  hoverEmail: boolean;
  hoverAbout: boolean;
  hoverProject: boolean;
  hoverText: boolean;
  isCopied: boolean;
}

export default function Cursor({ hoverEmail, hoverAbout, hoverProject, hoverText, isCopied }: CursorProps) {
  const cursor = useRef<HTMLDivElement>(null);
  const cursorLabel = useRef<HTMLDivElement>(null);
  const [cursorVisible, setCursorVisible] = useState(false);
  
  const [mousePosition, mousePositionChange] = useState({ clientX: 0, clientY: 0 });
  
  const cursorSize = hoverText ? 300 : 30;

  useEffect(() => {
    
    const handleMousePosition = (e: MouseEvent) => {
      mousePositionChange({ clientX: e.clientX, clientY: e.clientY });
      setCursorVisible(true);
    }

    window.addEventListener("mousemove", handleMousePosition);

    return () => {
      window.removeEventListener("mousemove", handleMousePosition);
    }
  }, [])
  
  useEffect(() => {
    let ctx1 = gsap.context(() => {
      gsap.to(cursor.current, {
        x: mousePosition.clientX - cursorSize / 2,
        y: mousePosition.clientY - cursorSize / 2,
        ease: "back.out(1.8)",
      });
      return () => ctx1.revert();
    });
    let ctx1Label = gsap.context(() => {
      gsap.to(cursorLabel.current, {
        x: mousePosition.clientX - cursorSize / 2,
        y: mousePosition.clientY - cursorSize / 2,
        ease: "back.out(1.8)",
      });
      return () => ctx1Label.revert();
    });
    }, [mousePosition]);

    return (
      <>
        {
          cursorVisible ? 
          <>
            <motion.div variants={cursorVariants} initial='initial' animate={hoverProject ? 'project' : hoverText ? 'text' : (hoverEmail || hoverAbout ? 'hover': 'initial')} transition={{duration: 0.2}} className={`hidden m:flex fixed pointer-events-none rounded-full bg-white z-50 ${hoverEmail || hoverAbout || hoverProject ? 'mix-blend-normal' : 'mix-blend-difference'}`} ref={cursor}>
            </motion.div>
            {
              hoverAbout ?
                <motion.div variants={labelVariants} initial='initial' animate={hoverAbout ? 'hover': 'initial'} className={`hidden text-[12px] font-bold text-black fixed z-50 pointer-events-none rounded-full transition-all duration-[40ms] ${hoverAbout ? 'items-center justify-center m:flex' : 'hidden'}`} ref={cursorLabel} >
                  { hoverAbout ? 'VER' : '' }
                </motion.div>
                :
                <motion.div variants={labelVariants} initial='initial' animate={hoverEmail ? 'hover': 'initial'} className={`hidden text-[12px] font-bold text-black fixed z-50 pointer-events-none rounded-full transition-all duration-[40ms] ${hoverEmail ? 'items-center justify-center m:flex' : 'hidden'}`} ref={cursorLabel} >
                  { isCopied ? 'COPIADO' : 'COPIAR' }
                </motion.div>
            }
          </> : <></>
        }
      </>
    );
}
