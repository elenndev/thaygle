'use client'
import { useSearchParams } from "next/navigation"
import { useEffect, useState, Suspense } from "react"
import FormQuote from "./components/Form"
import "../globals.css"
import '../components/style.css'
import TypeDadosCliente from "../components/Type_dadosCliente"
import FormDadosCliente from "./components/FormDadosCliente"
// import controlePergunta from "./components/controlePergunta"


const Orcamento = () => {
    const searchParams = useSearchParams()
    const produto = searchParams.get('produto') ?? 'default_value'
    const produto_tipo = searchParams.get('tipo') ?? 'default_value'
    const produto_nome = searchParams.get('nome') ?? 'default_value'
    const [paramsError, setErro] = useState(false)
    const [isLaje, setIsLaje] = useState<boolean | undefined>(undefined)
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
            <div className="pergunta-PreOrcamento perguntaLaje bg-[--devScheme-orange] text-[--devScheme-white] w-[90%] flex flex-col gap-x-[10px] items-center justify-center py-[10px] rounded-[20px]">
                        <p className="w-[90%] text-center">No local da instalação da churrasqueira, tem laje?</p>
                        <span className="flex flex-row items-center justify-around w-[90%]">
                            <button className="perguntaLaje sim text-white py-[3px] px-[20px] rounded-[20px]" type="button" onClick={() => handleResposta(true)}>Sim</button>
                            <button className="perguntaLaje nao text-white py-[3px] px-[20px] rounded-[20px]" type="button" onClick={() =>handleResposta(false)}>Não</button>
                        </span>
                    </div>
        </>)
    }

    return(
        <main className="orcamento h-full text-[1.25rem] relative m-0 w-screen flex flex-col items-center justify-between">
            <h1 className="font-gothic text-[--devScheme-gray] rounded-[20px] text-center px-[10px] text-[2rem]">Orcamento: {produto_nome}</h1>
            <div className="quote-container relative flex flex-col items-center justify-center min-h-[fit-content] h-[90%] w-[90%] gap-y-[30px]">
                {!pergunta_dadosCliente && (
                    <Pergunta_DadosCliente />
                )}
                {pergunta_dadosCliente && !pergunta_possuiLaje && (<>
                    <Pergunta_PossuiLaje />
                </>)}
                {pergunta_dadosCliente && pergunta_possuiLaje && (<>
                    <FormQuote produto_nome = {produto_nome} produto = {produto} produto_tipo={produto_tipo} isLaje={isLaje != undefined} dadosCliente={dadosCliente}/>
                </>)}


            </div>
        </main>
    )
}

export default function OrcamentoPage() {
    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <Orcamento />
        </Suspense>
    );
}

