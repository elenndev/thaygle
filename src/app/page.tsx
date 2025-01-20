import Navbar from "./_components/Navbar";
import { Suspense } from "react";
import SectionCatalogo from "./_components/SectionCatalogo";
import SectionSobre from "./_components/SectionSobre";
import Churrasqueiras from "./_components/utilities/Churrasqueiras";
import SectionHome from "./_components/SectionHome";


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
      <SectionHome />
      <Catalogo />
      <Sobre />
    </main>
    </>
  );
}
