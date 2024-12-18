'use client'
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import FormQuote from "./components/Form"

const Orcamento = () => {
    const searchParams = useSearchParams()
    const produto = searchParams.get('produto') ?? 'default_value'
    const produto_tipo = searchParams.get('tipo') ?? 'default_value'
    const produto_nome = searchParams.get('nome') ?? 'default_value'
    const [isLaje, setIsLaje] = useState<boolean | undefined>(undefined)
    const [paramsError, setErro] = useState(false)

    const [perguntas_preOrcamento, setPerguntas_preOrcamento] = useState(false)
    useEffect(()=> {
        const pergunta = produto == 'churrasqueira' && produto_tipo =='predial' ? false : true
        setPerguntas_preOrcamento(pergunta)
    }, [])
    useEffect(() => {
        if (produto == 'default_value' || produto_tipo == 'default_value' || produto_nome == 'default_value') {
            setErro(true);
        }
    }, [produto, produto_tipo, produto_nome]);

    // if(produto == 'churrasqueira' && produto_tipo != 'predial'){
    //     setIsLaje(false)
    // }

    if(paramsError){
        return(
            <p>Erro nos parâmetros</p>
        )
    }

    function handleQuestion(laje: boolean){
        setIsLaje(laje)
        setPerguntas_preOrcamento(true)
        console.log(perguntas_preOrcamento)
    }


    return(
        <div className="quote-container flex flex-col items-center justify-center w-full gap-y-[30px]">
            <p className="text-black bg-white text-[1.5rem]">Orcamento pro produto: {produto_nome}</p>
            {produto == 'churrasqueira' && produto_tipo == 'predial' && (
                <>
                <div className="pergunta-PreOrcamento text-black bg-white w-fit flex-column gap-x-[10px]">
                    <p>No local da instalação da churrasqueira, tem laje?</p>
                    <button className="isLaje bg-blue-700 text-white px-[10px] mr-[20px]" type="button" onClick={() =>handleQuestion(false)}>Não</button>
                    <button className="isLaje bg-blue-700 text-white px-[10px]" type="button" onClick={() => handleQuestion(true)}>Sim</button>
                </div>
                </>
            )}
            {perguntas_preOrcamento && (<>
                <FormQuote produto_nome = {produto_nome} produto = {produto} produto_tipo={produto_tipo} isLaje={isLaje != undefined}/>
            </>)}


        </div>
    )
}

export default Orcamento