'use client'
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import FormQuote from "../_components/FormOrcamento"
import "@/app/globals.css"
import TypeDadosCliente from "@/app/_components/types/Type_dadosCliente"
import FormDadosCliente from "../_components/FormDadosCliente"
import Navbar from "@/app/_components/Navbar"
import Churrasqueiras from "@/app/_components/utilities/Churrasqueiras"


const PageFazerOrcamento = () => {
    type TypeVariacao = {
        id: number,
        nome_variacao: string,
        imagem_variacao: string
    }
    const searchParams = useSearchParams()
    const produtoId = searchParams.get('id') ?? '0'
    const buscarProduto = Churrasqueiras.find((e)=> e.id == parseFloat(produtoId))
    const produto = buscarProduto?.infos.produto ?? 'undefined'
    const produto_tipo = buscarProduto?.infos.tipo ?? 'undefined'
    const produto_nome = buscarProduto?.nome ?? 'undefined'
    const produto_variacoes: TypeVariacao[] | undefined = buscarProduto?.detalhes.variacoes
    const [paramsError, setErro] = useState(false)
    const [isLaje, setIsLaje] = useState(false)
    const [dadosCliente, setDadosCliente] = useState<TypeDadosCliente | null>(null)
    // Perguntas pro orcamento
    const [pergunta_dadosCliente, setPergunta_dadosCliente] = useState(false)
    const [pergunta_possuiLaje, setPergunta_possuiLaje] = useState(false)
    useEffect(()=> {
        const pergunta = produto == 'churrasqueira' && produto_tipo =='predial' ? false : true
        setPergunta_possuiLaje(pergunta)
    }, [])

    useEffect(() => {
        if (produto == 'default_value' || produto_tipo == 'default_value' || produto_nome == 'default_value') {
            setErro(true);
        }
    }, [produto, produto_tipo, produto_nome]);

    if(paramsError){
        return(
            <p>Erro nos parâmetros</p>
        )
    }


    if (!produto_variacoes || produto_variacoes.length === 0) {
        return <div>Erro ao acessar variações</div>;
    }


    //elementos HTML
    const Pergunta_DadosCliente = () => {
        function handleResposta(dados: TypeDadosCliente){
            setPergunta_dadosCliente(true)
            setDadosCliente(dados)
        }
        return(<FormDadosCliente handleResposta={handleResposta} />)
    }
    const Pergunta_PossuiLaje = () => {
        function handleResposta(laje: boolean){
            setIsLaje(laje)
            setPergunta_possuiLaje(true)
        }

        return(<>
            <div className="pergunta-PreOrcamento  md:h-[30vh] bg-[--devScheme-orange] text-[--devScheme-white] w-[90%] flex flex-col gap-x-[10px] items-center justify-center py-[10px] rounded-[20px]">
                        <p className="w-[90%] text-center">
                            No local da instalação da churrasqueira, tem laje?</p>
                        <span className="flex flex-row items-center justify-center gap-x-[10px] w-[90%]">
                            <button className="perguntaLaje sim text-white py-[3px] px-[20px] rounded-[20px]" type="button" 
                            onClick={() => handleResposta(true)}>
                                Sim
                            </button>
                            <button className="perguntaLaje nao text-white py-[3px] px-[20px] rounded-[20px]" type="button" 
                            onClick={() =>handleResposta(false)}>
                                Não
                            </button>
                        </span>
                    </div>
        </>)
    }

    return(<>
        <Navbar isHome={false}/>
        <main className="orcamento h-full text-[1.25rem] md:text-[1.85rem] relative m-0 gap-y-[20px]  mt-[60px] w-screen flex flex-col items-center justify-start">
            <h1 className="mt-[15px] font-gothic text-[--devScheme-gray] rounded-[20px] text-center px-[10px] text-[2rem] md:text-[3rem]">Orcamento: {produto_nome}</h1>
            <div className="quote-container relative flex flex-col items-center justify-start min-h-[fit-content] h-[90%] w-[90%] gap-y-[30px]">
                {!pergunta_dadosCliente && (
                    <Pergunta_DadosCliente />
                )}
                {pergunta_dadosCliente && !pergunta_possuiLaje && (<>
                    <Pergunta_PossuiLaje />
                </>)}
                {pergunta_dadosCliente && pergunta_possuiLaje && (<>
                    <FormQuote produto_nome = {produto_nome} 
                    produto = {produto} 
                    produto_tipo={produto_tipo} 
                    isLaje={isLaje} 
                    dadosCliente={dadosCliente} 
                    variacoes={produto_variacoes}/>
                </>)}


            </div>
        </main>
    </>)
}

export default PageFazerOrcamento

