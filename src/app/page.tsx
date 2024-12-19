import Catalogo from "./components/Catalogo";
import HomeNavbar from "./components/Navbar";

const Home = () => {
  return(<>
    <div className="home flex overflow-x-hidden flex-col items-center justify-center h-full w-full relative bg-[--devScheme-blue]" id="home">
      <h1 className="text-[--devScheme-orange] text-[2rem] uppercase">Churrasqueiras pré-moldadas</h1>
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
      <Home />
      <HomeNavbar />
      <Catalogo />
    </div>
    </>
  );
}
