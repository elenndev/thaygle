import Image from 'next/image'

const Sobre = () => {
    return(<>
        <section id="sobre" className="sobre relative flex overflow-x-hidden flex-col items-center justify-center h-screen w-full bg-[--devScheme-orange] text-[--devScheme-white]">
            <h2 className="text-[--devScheme-white] text-[2.5rem] font-gothic font-medium uppercase tracking-widest text-center">Sobre</h2>
            <span className="foto-empresa w-fit h-fit relative">
                <Image className="foto-empresa relative" loading="lazy" height={200} width={200} alt="Logo da Thaygle pré-moldados"  src="/logo.webp" />
            </span>
            <p className="w-full">Loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren</p>
            <span className="w-full bg-[--devScheme-blue]">logos</span>
        </section>
    </>)
}

export default Sobre