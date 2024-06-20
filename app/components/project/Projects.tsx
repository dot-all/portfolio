import { useState } from 'react'

import Project from '@components/project/Project'
import ModalProject from '@components/project/ModalProject'
import AnimatedText from '@components/common/AnimatedText'

import type { ProjectInterface, ModalState, TextVariant, SetUseState } from '@type/portfolioTypes'

const projects: ProjectInterface[] = [
  {
    title: "Acacia",
    type: "Ecommerce",
    src: "projects/thum1.jpg",
    color: "#8FE8D3"
  },
  {
    title: "Caoba",
    type: "Music",
    src: "projects/thum2.jpg",
    color: "#6F38D3"
  },
  {
    title: "Cerezo",
    type: "Dream",
    src: "projects/thum3.jpg",
    color: "#EAE8D3"
  },
  {
    title: "Haya",
    type: "Web3",
    src: "projects/thum1.jpg",
    color: "#E4A8D3"
  },
]

const textVariants: TextVariant = {
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

interface ProjectsProps {
  setHoverProject: SetUseState;
}

export default function Projects({setHoverProject}: ProjectsProps) {

  const [modal, setModal] = useState<ModalState>({active: false, index: 0})

  return (
    <section className='flex flex-col bg-[#111111] text-white pb-44 w-10/12 mx-auto' id="projects">
      <h2 className='w-fit text-5xl m:text-8xl font-lato font-black py-28'><AnimatedText text='PROYECTOS' textVariants={textVariants} once /></h2>
      <ul className='mx-auto flex items-center justify-center flex-col border-b border-[#a2a2a9] w-full'>
        {
          projects.map((project, index) => (
            <Project key={index} index={index} title={project.title} type={project.type} setModal={setModal} setHoverProject={setHoverProject}/>
          ))
        }
      </ul>
      <ModalProject modal={modal} projects={projects}/>
    </section>
  )
}
