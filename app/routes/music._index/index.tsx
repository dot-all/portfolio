import React from 'react'
import type { MetaFunction } from "@remix-run/node";
import Information from '~/components/project/route/Information';
import Link from '@components/footer/Link';

export const meta: MetaFunction = () => {
  return [
    { title: "Allan Quiroz — Web Developer" },
    { name: "author", content: "Allan Quiroz" },
    { name: "description", content: "Desarrollador web full stack con experiencia en tecnologías frontend y backend. Especializado en crear experiencias únicas" },
    { name: "keywords", content: "desarrollo web, full stack, JavaScript, TypeScript, React, Vue, Angular, Node.js, Python, web developer, HTML, CSS, Bootstrap, Sass, Responsive design, API, RESTful, Express.js, MongoDB, SQL, PostgreSQL, Django, Flask, Testing, Git, Agile, MVC, SPA"}
  ];
};

const project = {
  name: 'MUSIC',
  stack: ['React', 'Node', 'Shacdn'],
  description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem consequatur explicabo consectetur molestias corporis molestiae dolorum vitae ad? Nisi repellat, tempora vel eligendi obcaecati atque nihil vitae fugiat dignissimos dolor.',
  src: '/projects/route/dummy.webp',
  colors: [
    {
      hex: '#123321',
      name: 'Color AZ',
    },
    {
      hex: '#123456',
      name: 'Violeta ultrarojo',
    },
    {
      hex: '#654321',
      name: 'Color VCDE',
    },
  ],
  fontFamily: ['Roboto', 'Lato'],
  href: 'allan.pages.dev'
}

export default function index() {
  return (
    <>
      <main className='bg-black w-full text-white relative'>
        <section className='w-11/12 mx-auto relative h-28 block mb-16 s:mb-20 m:mb-28'>
          <span className='absolute top-14 s:top-8 left-0 text-xl s:text-3xl m:text-4xl font-roboto'>Allan Quiroz</span>
        </section>
        <section className='w-11/12 mx-auto grid m:grid-cols-2 grid-rows-1 h-fit'>
          <div className='h-full col-start-1'>
            <div className='sticky top-40 w-full m:w-10/12'>
              <h1 className='text-5xl s:text-6xl m:text-7xl font-roboto'>{project.name}</h1>
              <div className='flex flex-row gap-x-4'>
                { project.stack.map((tech, index) => (<span key={index} className='my-3 block text-xl'>{tech}</span>)) }
              </div>
              <p className='pb-20'>{project.description}</p>
              <Link content="Ir al sitio" href={project.href} />
            </div>
          </div>
          <div className="mt-10 m:mt-0 m:col-start-2">
            <img src={project.src} alt={project.name} className='rounded-md' />
          </div>
        </section>
        <section className='h-2' ></section>
        <Information colors={project.colors} fontFamily={project.fontFamily} />
        <section className='w-11/12 mx-auto flex items-center justify-center'>
          <a href="/#projects" className='w-fit mx-auto flex flex-row text-lg'>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 mr-1 " viewBox="0 0 512 512"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="38" d="M244 400L100 256l144-144M120 256h292"/></svg>
            Regresar
          </a>
        </section>
        <footer className='h-20 s:h-32 m:h-40' ></footer>
      </main>
    </>
  )
}
