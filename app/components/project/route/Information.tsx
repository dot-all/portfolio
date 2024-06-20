type colors = {
  hex: string;
  name: string;
}

interface ColorsProps {
  colors: colors[];
  fontFamily: string[];
}
export default function Information({colors, fontFamily}: ColorsProps) {
  return (
    <section className='w-11/12 flex flex-col mx-auto py-32 m:py-48 gap-20'>
      <h4 className="text-3xl s:text-5xl m:text-6xl mx-auto">FUENTE TIPOGRÁFICA</h4>
      <div className="flex flex-row items-center justify-center gap-x-20">
        { fontFamily.map((font, index) => (
          <span className="text-2xl s:text-4xl m:text-5xl hover:text-white/50 trnasition-all duration-200" style={{fontFamily: font}} key={index} >{font} Aa</span>
        )) }
      </div>
      <h3 className="text-3xl s:text-5xl m:text-6xl mx-auto pt-16 m:pt-28">PALETA DE COLORES</h3>
      <div className="gap-10 items-center justify-center flex flex-row">
        { colors.map((color, index) => (
          <div key={index} className="flex flex-col items-center justify-center gap-2">
          <div className='h-20 w-20 s:h-28 s:w-28 m:h-36 m:w-36 rounded-full hover:scale-105 transition-all duration-200' title={color.name} style={{backgroundColor: color.hex}}></div>
          <p className="text-lg w-fit">{color.hex}</p>
        </div>
        )) }
      </div>
    </section>
  )
}
