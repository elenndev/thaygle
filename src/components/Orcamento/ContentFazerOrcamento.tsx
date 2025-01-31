'use client'
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import "@/app/globals.css"
import FormDadosCliente from "./FormDadosCliente"
import Navbar from "@/components/Navbar"
import { useOrcamento } from "./use-Orcamento"
import { TypeDadosCliente } from "../../types"
import { FormOrcamento } from "./FormOrcamento"


type TypeVariacao = {
    id: number,
    nome_variacao: string,
    imagem_variacao: string
}
export const ContentFazerOrcamento = () => {
    const searchParams = useSearchParams()
    const {dadosCliente,
        isLaje,
        setDadosCliente,
        setIsLaje,
        buscarProduto} = useOrcamento()
    const produtoId = searchParams.get('id') ?? '0'

    const produto = {
        produto: buscarProduto(+produtoId)?.infos.produto ?? 'undefined',
        tipo: buscarProduto(+produtoId)?.infos.tipo ?? 'undefined',
        nome: buscarProduto(+produtoId)?.nome ?? 'undefined',
        variacoes: buscarProduto(+produtoId)?.detalhes.variacoes as TypeVariacao[] | null}

    const [paramsError, setErro] = useState(false)

    // Perguntas pro orcamento
    const [pergunta_dadosCliente, setPergunta_dadosCliente] = useState(false)
    const [pergunta_possuiLaje, setPergunta_possuiLaje] = useState(produto.produto == 'churrasqueira' && produto.tipo =='predial' ? false : true)

    if (produto.produto == 'default_value' || produto.tipo == 'default_value' || produto.nome == 'default_value') {
        setErro(true);
    }

    if(paramsError){
        return(
            <p>Erro nos parâmetros</p>
        )
    }

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
            <h1 className="mt-[15px] font-gothic text-[--devScheme-gray] rounded-[20px] text-center px-[10px] text-[2rem] md:text-[3rem]">Orcamento: {produto.nome}</h1>
            <div className="quote-container relative flex flex-col items-center justify-start min-h-[fit-content] h-[90%] w-[90%] gap-y-[30px]">
                {!pergunta_dadosCliente && (
                    <Pergunta_DadosCliente />
                )}
                {pergunta_dadosCliente && !pergunta_possuiLaje && (<>
                    <Pergunta_PossuiLaje />
                </>)}
                {pergunta_dadosCliente && pergunta_possuiLaje && (<>
                    <FormOrcamento produto_nome = {produto.nome} 
                    produto = {produto.produto} 
                    produto_tipo={produto.tipo} 
                    isLaje={isLaje} 
                    dadosCliente={dadosCliente} 
                    variacoes={produto.variacoes}/>
                </>)}
            </div>
        </main>
    </>)
}


