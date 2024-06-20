import Character from '@components/about/Character';
import Accordion from '@components/about/Accordion';

import type { SetUseState } from '@type/portfolioTypes'


interface AboutMeProps {
  setHoverAbout: SetUseState;
}

export default function AboutMe({setHoverAbout}: AboutMeProps) {
  return (
  <section className='pt-20 pb-36 relative overflow-hidden bg-[#111111] text-white' id="about-me">
    <h2 className='text-4xl s:text-6xl m:text-8xl w-10/12 mx-auto z-10 flex flex-col gap-y-4'><Character paragraph="Transformando ideas" /> <Character paragraph="en experiencias"/> <Character paragraph="únicas"/> </h2>
    <Accordion setHoverAbout={setHoverAbout} />
  </section>
  )
}
