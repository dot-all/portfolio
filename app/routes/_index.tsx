import { useEffect, useState } from "react";
import type { MetaFunction } from "@remix-run/node";

import Header from "@components/header/Header";
import Home from "@components/home/Home";
import Experiences from "@components/experience/Experiences";
import Projects from "@components/project/Projects"
import AboutMe from "@components/about/AboutMe";
import Footer from "@components/footer/Footer";

import Cursor from "@components/common/Cursor";

export const meta: MetaFunction = () => {
  return [
    { title: "Allan Quiroz — Web Developer" },
    { name: "author", content: "Allan Quiroz" },
    { name: "description", content: "Desarrollador web full stack con experiencia en tecnologías frontend y backend. Especializado en crear experiencias únicas" },
    { name: "keywords", content: "desarrollo web, full stack, JavaScript, TypeScript, React, Vue, Angular, Node.js, Python, web developer, HTML, CSS, Bootstrap, Sass, Responsive design, API, RESTful, Express.js, MongoDB, SQL, PostgreSQL, Django, Flask, Testing, Git, Agile, MVC, SPA"}
  ];
};

export default function Index() {
  const [hoverEmail, setHoverEmail] = useState(false);
  const [hoverAbout, setHoverAbout] = useState(false);
  const [hoverProject, setHoverProject] = useState(false);
  const [hoverText, setHoverText] = useState(false);

  const [isCopied, setIsCopied] = useState(false)

  const [isTouchDevice, setIsTouchDevice] = useState(false);


  useEffect(() => {
    const handleDevice = () => {
      if('ontouchstart' in window || navigator.maxTouchPoints) {
        setIsTouchDevice(true);
      } else {
        setIsTouchDevice(false);
      }
    }
    return () => {
    }
  }, [])
  


  return (
    <>
      {
        isTouchDevice ? <></> :
        <Cursor hoverEmail={hoverEmail} hoverAbout={hoverAbout} hoverProject={hoverProject} hoverText={hoverText} isCopied={isCopied}/>
      }
      <Header />
      <main className="bg-[#111111]">
        <Home setHoverText={setHoverText} />
        <Experiences/>
        <Projects setHoverProject={setHoverProject}/>
        <AboutMe setHoverAbout={setHoverAbout}/>
      </main>
      <Footer setHoverEmail={setHoverEmail} setIsCopied={setIsCopied}/>
    </>
  );
}
