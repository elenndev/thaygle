import Image from 'next/image'

const Sobre = () => {
    return(<>
          <section id="sobre" className="sorbre relative flex overflow-x-hidden flex-col items-center justify-center h-screen w-full bg-[--devScheme-orange] text-[--devScheme-white]">
            <h2 className="text-[--devScheme-white] text-[2.5rem] font-gothic font-bold uppercase tracking-widest text-center">Sobre</h2>
            <Image className="foto-empresa relative" loading="lazy" height={200} width={200} alt="Logo da Thaygle pré-moldados"  className="sobre-empresa" src="/logo.webp" />
            <p className="w-full">Loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren</p>
            <span className="w-full bg-[--devScheme-blue]">logos</span>
        </section>
    </>)
}

export default Sobre