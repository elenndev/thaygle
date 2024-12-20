import Catalogo from "./components/Catalogo";
import HomeNavbar from "./components/Navbar";
import Image from 'next/image'
// import Logo from "./"

const Home = () => {
  const logoImageStyle = {
    'zIndex': '2',
    'Position': 'absolute',
  }

  return(<>
    <div className="home flex overflow-x-hidden flex-col items-center justify-center h-full w-full relative" id="home">
      <Image style={logoImageStyle} loading="lazy" height={200} width={200} alt="Logo da Thaygle pré-moldados" src="/logo.webp" />
      <h1 className="text-[--devScheme-orange] text-[2rem] uppercase text-center">Churrasqueiras pré-moldadas</h1>
      <span className="w-fit bg-[--devScheme-white] text-[--devScheme-gray] py-[5px] px-[20px] rounded-[10px]">
        <a className="localizacao">Em Itumbiara - GO e proximidades</a>
      </span>
    </div>
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
    <div className="homepage relative min-h-[fit-content] bg-gray-900 w-screen h-full flex flex-col items-center justify-end">
      <HomeNavbar />
      <Home />
      <Catalogo />
    </div>
    </>
  );
}
