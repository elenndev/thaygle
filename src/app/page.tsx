import Navbar from "./_components/Navbar";
import Image from 'next/image'
import { Suspense } from "react";
import SectionCatalogo from "./_components/SectionCatalogo";
import SectionSobre from "./_components/SectionSobre";
import Churrasqueiras from "./_components/utilities/Churrasqueiras";

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
        <a className="localizacao cursor-pointer font-gothic text-[1.25rem] lg:text-[2rem] tracking-wider" href="https://www.google.com/maps?q=Itumbiara,+Goi%C3%A1s" target="_blank">Em Itumbiara - GO</a>
      </span>
    </section>
  </>)
}

const Catalogo = () => {
  const principaisProdutos = Churrasqueiras

  return(
      <Suspense fallback={<div className="bg-white text-black">
        <h2>Churrasqueiras pré-moldadas disponiveis dos mais variados modelos e cores:</h2>
        {principaisProdutos.map((produto, index) => (<span key={index}>
          <p>{produto.nome}</p>
          <p>{produto.infos.breve_descricao}</p>
          <p>{produto.infos.descricao_completa}</p>
          <h3>Variações</h3>
          <ul>
            {produto.detalhes.variacoes.map((variacao, index)=>(
              <li key={index}>{variacao.nome_variacao}</li>
            ))}
          </ul>
          <h3>Mais informações:</h3>
          <div>
            {produto.detalhes.listas?.map((lista, index) => (
              <span key={index}>
                <p>{lista.nome_lista}</p>
                <ul>
                  {lista.itens_lista.map((item, index)=>(
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </span>
              ))}
          </div>
        </span>))}
        </div>}>
    
          <SectionCatalogo/>
      </Suspense>
  )
}
const Sobre = () => {
  return(
      <Suspense fallback={
      <div className="bg-white text-black">
        <h2>Sobre</h2>
        <p>Texto sobre a empresa</p>
      </div>}>
          <SectionSobre />
      </Suspense>
  )
}


export default function HomePage() {

  return (
    <>
    <Navbar isHome={true}/>
    <main className="homepage relative min-h-[fit-content] bg-gray-900 w-screen min-w-screen h-full flex flex-col items-center justify-end">
      <Home />
      <Catalogo />
      <Sobre />
    </main>
    </>
  );
}
