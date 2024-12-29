import TypeOrcamento from "@/app/components/Type_orcamento";
import { useState, useEffect } from "react";
import GerarPdfOrcamento from "./GerarPdf";
import ConfirmationModal from "./ModalFecharOrcamento";
import { redirect } from "next/navigation";
import TypeDadosCliente from "@/app/components/Type_dadosCliente";
// import controlePergunta from "./controlePergunta";



const OrcamentoFinalizado: React.FC<{dadosCliente: TypeDadosCliente | null,getOrcamento: TypeOrcamento, alturaParede: number, produtoInfo: string}> = ({getOrcamento, alturaParede, produtoInfo, dadosCliente}) => {
    const [isDesconto, setIsDesconto] = useState(false)
    const [orcamento, setOrcamento] = useState<TypeOrcamento>(getOrcamento)
    const [salvarOrcamento, setSalvarOrcamento] = useState(false)
    const [orcamentoEnviado, setOrcamentoEnviado] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleCloseModal = () => {
        redirect('/')
        // setIsModalOpen(false)
        // setOrcamentoEnviado(true)
        // handleVoltarHomepage()
    }
    const handleConfirmModal = () => {
        setIsModalOpen(false)
        redirect('/')
    }



    function handleControlePergunta(resposta: boolean, event: React.MouseEvent<HTMLButtonElement>){
        setIsDesconto(resposta)
        console.log(event)
    }

    function finalizarOrcamento(){
        GerarPdfOrcamento(dadosCliente, orcamento, alturaParede)
        setSalvarOrcamento(true)
        setOrcamentoEnviado(true)
        
        // redirect('/')
    }

    function handleVoltarHomepage(){
        if(orcamentoEnviado){
            redirect('/')
        } else {
            setIsModalOpen(true);
        }
    }

    function aplicarDesconto(){
        if(isDesconto){
            const desconto = orcamento.soma * 0.05
            setOrcamento({
                ...orcamento,
                desconto: desconto,
                total: orcamento.soma - desconto
            })
        } else {
            const desconto = 0
            setOrcamento({
                ...orcamento,
                desconto: 0,
                total: orcamento.soma - desconto
            })
        }
    }

    useEffect(()=> {
        aplicarDesconto()
    }, [isDesconto])

    //elementos html
    const BaixarOrcamento = () => {
        return(<div className="flex flex-col text-[--devScheme-gray] w-[80%] h-full items-center justify-start">
            <p>Baixando orçamento...</p>
            <p onClick={()=> GerarPdfOrcamento(dadosCliente, orcamento, alturaParede)}>Download não iniciou? <strong>Clique aqui para tentar novamente</strong></p>
            <button className="bg-[--devScheme-orange] text-white rounded-[2rem] px-[10px]  py-2" type="button" onClick={handleVoltarHomepage}>Voltar ao inicio</button>
        </div>)
    }

    const PerguntaDesconto = () =>{
        return(<>
            <span className="bg-[--devScheme-orange] rounded-[20px] justify-center text-[--devScheme-white] p-[10px] perguntaDesconto flex flex-col items-center w-[90%]">
                <p className=" w-full text-center">O pagamento seria no Pix?</p>
                <span className="flex w-full flex-row items-center justify-evenly">
                    <button type="button" className={`perguntaDesconto sim py-[3px] px-[20px] rounded-[20px] ${isDesconto === true ? "on" : "off"}`} onClick={(event)=> handleControlePergunta(true, event)}>Sim</button>
                    <button type="button" className={`perguntaDesconto nao py-[3px] px-[20px] rounded-[20px] ${isDesconto === true ? "off" : "on"}`}  onClick={(event)=> handleControlePergunta(false, event)}>Não</button>
                </span>
        </span>    
        </>)
    }

    return(<>
    {salvarOrcamento?(<BaixarOrcamento/>):(<>
        <div className="orcamento-concluido mt-[20px] flex flex-col w-[97%] text-black items-center justify-center">
            {produtoInfo == 'churrasqueira' && (<> 
                <p>Altura da parede: {alturaParede}m</p>
                <p>Quantidade de dutos: {orcamento.dutos.qt}</p>
                <p>Valor dos dutos: R${orcamento.dutos.valor}</p>
                {orcamento.modulos.qt > 0 && (<>
                    <p>Quantidade de modulos: {orcamento.modulos.qt}</p>
                    <p>Valor dos modulos: R${orcamento.modulos.valor}</p>
                </>)}
            </>)}
            <PerguntaDesconto />
            <div className="valores border-y-2 border-solid border-black py-[2rem] my-[1.5rem]">
                {isDesconto ?(<>
                    <p className="line-through">Valor sem desconto: R${orcamento.soma.toFixed(2).replace(".",",")}</p>
                    <p>Desconto: R${orcamento.desconto.toFixed(2).replace(".",",")}</p>
                    <p>Valor total: R${orcamento.total.toFixed(2).replace(".",",")}</p>
                </>):(<>
                    <p>Valor total: R${orcamento.total.toFixed(2).replace(".",",")}</p>
                </>)}
            </div>
            <button className="bg-[--devScheme-orange] text-white rounded-[2rem] px-[10px]  py-2" type="button" onClick={() => {finalizarOrcamento()}}>Finalizar orçamento!</button>
            <button className="bg-[--devScheme-gray] text-white rounded-[2rem] mt-[10px] px-[15px]  py-2" type="button" onClick={()=>{handleVoltarHomepage()}}>Voltar</button>

        </div>
    </>)}
        <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmModal}/>
    </>)
}

export default OrcamentoFinalizado