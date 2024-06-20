import Link from '@components/footer/Link'
import { SetUseState } from '@type/portfolioTypes';
import { useState } from 'react';

const socials = [
  {
    title: 'LinkedIn',
    link: 'https://www.linkedin.com/in/im-allan/'
  },
  {
    title: 'CodePen',
    link: 'https://codepen.io/im-allan'
  },
  {
    title: 'Kaggle',
    link: 'https://www.kaggle.com/allanqs'
  },
]

interface FooterProps {
  setHoverEmail: SetUseState;
  setIsCopied: SetUseState;
}


export default function Footer({setHoverEmail, setIsCopied}: FooterProps) {
  const [showToast, setShowToast] = useState(false);
  const email = 'al.quirozsilva@gmail.com'

  const handleCopied = () => {
      navigator.clipboard.writeText(email)
      .then(() => {
        setIsCopied(true);
        setShowToast(true);
      })
      .catch(err => {
        console.error('Error al copiar el correo electrónico: ', err);
      });

      setTimeout(() => {
        setShowToast(false);
      }, 1000);

  }

  return (
    <footer className="h-[50vh] m:h-[90vh] w-full bg-[#111111] text-white" id="contact">
      <section className='w-10/12 mx-auto h-full grid grid-rows-3 grid-cols-2'>
        <div className='row-start-2 flex flex-col items-start'>
          <p className='text-4xl s:text-6xl m:text-7xl font-lato'>CONTÁCTAME</p>
          <button className="block text-2xl s:text-4xl py-8" onClick={handleCopied} onMouseEnter={() => setHoverEmail(true)} onMouseLeave={() => setHoverEmail(false)}>{email}</button>
        </div>
        <div className="row-start-3 mt-auto col-span-4 flex flex-row-reverse w-full gap-8 mb-4">
          {
            socials.map((social, index) => (
              <Link href={social.link} content={social.title} key={index} />
              ))
            }
          
        </div>
      </section>
      {
        !showToast ? <></> :
        <div id="toast-bottom-left" className="fixed z-50 flex m:hidden items-center w-full max-w-xs p-4 space-x-4 text-white bg-green-700 divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow bottom-5 right-5" role="alert">
          <div className="text-sm font-normal">¡Correo electrónico copiado!</div>
        </div>
      }
    </footer>
  )
}

