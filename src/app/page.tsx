import Catalogo from "./components/Catalogo";
import Sobre from "./components/Sobre";
import Navbar from "./components/Navbar";
import Image from 'next/image'
// import Logo from "./"

const Home = () => {
  const logoImageStyle = {
    'zIndex': '2',
    'Position': 'absolute',
  }

  return(<>
    <section id="hero" className="home relative flex overflow-y-hidden overflow-x-hidden flex-col items-center justify-center max-h-screen h-full w-full">
      <Image style={logoImageStyle} loading="lazy" height={200} width={200} alt="Logo da Thaygle pré-moldados"  className="absolute top-[12vh] left-[2vw] md:left-[1%] md:top-[30%] lg:top-[25%] lg:left-[8%]" src="/logo.webp" />
      <h1 className="text-[--devScheme-orange] mt-[26%] md:mt-[0] md:ml-[20%] text-[3.25rem] md:text-[5.5rem] lg:ml-[28%] lg:text-[6rem] font-gothic font-normal uppercase tracking-wider text-center">Churrasqueiras<br></br>pré-moldadas</h1>
      <span className="w-fit bg-[--devScheme-white] text-[--devScheme-gray] md:ml-[20%] lg:ml-[28%] mb-[0%] py-[5px] px-[20px] rounded-[5px]">
        <a className="localizacao font-gothic text-[1.25rem] lg:text-[2rem] tracking-wider">Em Itumbiara - GO e proximidades</a>
      </span>
    </section>
  </>)
}


export default function HomePage() {
  if (typeof window === "undefined"){
    console.log("server")
  }else{
    console.log("client")
  }

  return (
    <>
    <main className="homepage relative min-h-[fit-content] bg-gray-900 w-screen h-full flex flex-col items-center justify-end">
      <Navbar isHome={true}/>
      <Home />
      <Catalogo />
      <Sobre />
    </main>
    </>
  );
}
