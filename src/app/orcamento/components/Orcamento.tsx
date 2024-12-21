import TypeOrcamento from "@/app/components/Type_orcamento";
import { useState, useEffect } from "react";
import GerarPdfOrcamento from "./GerarPdf";
import ConfirmationModal from "./ModalFecharOrcamento";
import { redirect } from "next/navigation";



const OrcamentoFinalizado: React.FC<{getOrcamento: TypeOrcamento, alturaParede: number}> = ({getOrcamento, alturaParede}) => {
    const [isDesconto, setIsDesconto] = useState(false)
    const [orcamento, setOrcamento] = useState<TypeOrcamento>(getOrcamento)
    const [orcamentoEnviado, setOrcamentoEnviado] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleCloseModal = () => {
        setIsModalOpen(false)
        setOrcamentoEnviado(true)
        handleVoltarHomepage()
    }
    const handleConfirmModal = () => {
        setIsModalOpen(false)
        redirect('/')
    }

    function finalizarOrcamento(){
        GerarPdfOrcamento(orcamento, alturaParede)
        setOrcamentoEnviado(true)
        
        redirect('/')
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
    const PerguntaDesconto = () =>{
        return(<>
            <span className="bg-[--devScheme-orange] justify-center p-[10px] ask desconto grid grid-cols-2 gap-4 w-[50%]">
                <p className="col-span-2 text-center">O pagamento seria no Pix?</p>
                <button type="button" className="bg-[--devScheme-softBlue] text-[--devScheme-white] rounded-sm p-2" onClick={()=> setIsDesconto(true)}>Sim</button>
                <button type="button" className="bg-[--devScheme-softBlue] text-[--devScheme-white] rounded-sm  p-2" onClick={()=> setIsDesconto(false)}>Não</button>
        </span>    
        </>)
    }
    return(<>
    <div className=" flex flex-col bg-white text-black items-center justify-center">
        <p>Altura da parede: {alturaParede}m</p>
        <p>Quantidade de dutos: {orcamento.dutos.qt}</p>
        <p>Valor dos dutos: R${orcamento.dutos.valor}</p>
        {orcamento.modulos.qt > 0 && (<>
            <p>Quantidade de modulos: {orcamento.modulos.qt}</p>
            <p>Valor dos modulos: R${orcamento.modulos.valor}</p>
        </>)}
        <PerguntaDesconto />
        {/* <p> Valor sem desconto: R${orcamento.soma}</p> */}
        <p>Valor sem desconto: R${orcamento.soma.toFixed(2).replace(".",",")}</p>
        <p>Desconto: R${orcamento.desconto.toFixed(2).replace(".",",")}</p>
        <p>Valor total: R${orcamento.total.toFixed(2).replace(".",",")}</p>
        <button className="bg-[--devScheme-orange] text-white rounded-sm  p-2" type="button" onClick={() => {finalizarOrcamento()}}>Finalizar orçamento!</button>
        <button className="bg-[--devScheme-gray] text-white rounded-sm  p-2" type="button" onClick={()=>{handleVoltarHomepage()}}>Voltar</button>

    </div>
        <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmModal}/>
    </>)
}

export default OrcamentoFinalizado