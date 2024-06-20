interface ExperienceItemProps {
 title: string;
 date: string;
 description: string;
 position: string;
 method: string[];
 top: string;
 bottom: string;
}

export default function Experience({title, date, description,  position, method, top, bottom}: ExperienceItemProps) {

  return (
      <div className='border-t border-[#a2a2a9] font-lato sticky top-0 grid grid-cols-1 m:grid-cols-2 transition-color duration-0 bg-[#111111]'style={{top: top, marginBottom: bottom}}>
        <h3 className='text-3xl m:text-5xl m:col-span-2 row-start-1 mb-4 mt-4 transition-all duration-0'>{title}</h3>
        <span className='text-xl m:text-2xl py-2 transition-all duration-0 text-white/50'>{position}</span> 
        <p className='col-start-1 text-lg m:text-xl transition-all duration-0'>{description}</p>
        <section className='m:col-start-2 flex flex-col gap-y-4 m:mx-auto text-xl mt-4 m:mt-0 m:text-5xl font-semibold transition-all duration-0 w-8/12'>
          { method.map((item, index) => (<span key={index} >{item}</span>)) }
        </section>

        <time className='position absolute right-0 text-[100px] h-[100px] m:text-[200px] font-black bottom-0 m:h-[200px] -z-10 transition-all duration-0 text-[#ffffff1a]'>{date}</time>
      </div>
  )
}
