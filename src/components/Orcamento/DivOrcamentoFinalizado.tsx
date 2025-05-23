import { useState} from "react";
import ConfirmationModal from "./ModalFecharOrcamento";
import { redirect } from "next/navigation";
import { TypeDadosCliente, TypeOrcamento } from "@/types";
import { useOrcamento } from "./use-Orcamento";

type OrcamentoFinalizadoProps = {
    dadosCliente: TypeDadosCliente | null,
    getOrcamento: TypeOrcamento, 
    alturaParede: number, 
    produtoInfo: string, 
    produtoVariacao: string | undefined
}

const OrcamentoFinalizado: React.FC<{props: OrcamentoFinalizadoProps}> = ({props}
) => {
    const { getOrcamento, 
    alturaParede, 
    produtoInfo, 
    dadosCliente, 
    produtoVariacao} = props

    const [isDesconto, setIsDesconto] = useState(false)
    const [orcamento, setOrcamento] = useState<TypeOrcamento>(getOrcamento)
    const [salvarOrcamento, setSalvarOrcamento] = useState(false)
    const [orcamentoEnviado, setOrcamentoEnviado] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleCloseModal = () => {
        redirect('/')
    }
    const handleConfirmModal = () => {
        setIsModalOpen(false)
        redirect('/')
    }

    const {GerarPdfOrcamento} = useOrcamento()

    function handleControlePergunta(resposta: boolean){
        setIsDesconto(resposta)
        aplicarDesconto(resposta)
    }

    function finalizarOrcamento(enviarMensagem: boolean){
        GerarPdfOrcamento({props:{dadosCliente, orcamento, alturaParede, produtoVariacao, enviarMensagem}})
        setSalvarOrcamento(true)
        setOrcamentoEnviado(true)
    }

    function handleVoltarHomepage(){
        if(orcamentoEnviado){
            redirect('/')
        } else {
            setIsModalOpen(true);
        }
    }

    function aplicarDesconto(desconto: boolean){
        if(desconto){
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

    const BaixarOrcamento = () => {
        return(<div className="flex flex-col text-[--devScheme-gray] w-[80%] h-full items-center justify-start">
            <p>Baixando orçamento...</p>
            <p className="cursor-pointer" 
            onClick={()=> GerarPdfOrcamento({props:{dadosCliente, orcamento, alturaParede, produtoVariacao, enviarMensagem: false}})}>
                Download não iniciou? <strong>Clique aqui para tentar novamente</strong>
            </p>
            <button className="bg-[--devScheme-orange] text-white rounded-[2rem] px-[10px]  py-2" 
            type="button" 
            onClick={handleVoltarHomepage}>
                Voltar ao inicio
            </button>
        </div>)
    }

    const PerguntaDesconto = () =>{
        return(<>
            <span className="bg-[--devScheme-orange] rounded-[20px] justify-center text-[--devScheme-white] p-[10px] perguntaDesconto flex flex-col items-center w-[90%]">
                <p className=" w-full text-center">O pagamento seria no Pix?</p>
                <span className="flex w-full flex-row items-center justify-evenly">
                    <button type="button" className={`perguntaDesconto sim py-[3px] px-[20px] rounded-[20px] ${isDesconto === true ? "on" : "off"}`} 
                    onClick={()=> handleControlePergunta(true)}>
                        Sim
                    </button>
                    <button type="button" className={`perguntaDesconto nao py-[3px] px-[20px] rounded-[20px] ${isDesconto === true ? "off" : "on"}`}  
                    onClick={()=> handleControlePergunta(false)}>
                        Não
                    </button>
                </span>
        </span>    
        </>)
    }

    return(<>
    {salvarOrcamento?(<BaixarOrcamento/>):(<>
        <div className="orcamento-concluido mt-[20px] flex flex-col w-[97%] text-black items-center justify-center">
            {produtoInfo == 'churrasqueira' && (<> 
                {produtoVariacao != undefined && (<p>Variação: {produtoVariacao}</p>)}
                <p>Altura da parede: {alturaParede}m</p>
                <p>Quantidade de dutos necessários: {orcamento.dutos.qt}</p>
                <p>Valor dos dutos: R${orcamento.dutos.valor}</p>
                {orcamento.modulos.qt > 0 && (<>
                    <p>Quantidade de módulos necessários: {orcamento.modulos.qt}</p>
                    <p>Valor dos modulos: R${orcamento.modulos.valor}</p>
                </>)}
            </>)}
            <PerguntaDesconto />
            <div className="valores border-y-2 border-solid border-black py-[2rem] my-[1.5rem]">
                {isDesconto ?(<>
                    <p className="line-through">Valor sem desconto: R${orcamento.soma.toFixed(2).replace(".",",")}</p>
                    <p>Desconto: R${orcamento.desconto.toFixed(2).replace(".",",")}</p>
                    <p>Valor total da churrasqueira: R${orcamento.total.toFixed(2).replace(".",",")}</p>
                </>):(<>
                    <p>Valor total da churrasqueira: R${orcamento.total.toFixed(2).replace(".",",")}</p>
                </>)}
            </div>
            <button className="bg-[--devScheme-orange] text-white rounded-[2rem] px-[10px]  py-2" 
            type="button" 
            onClick={() => {finalizarOrcamento(true)}}>
                Finalizar orçamento!
            </button>
            <button className="bg-[--devScheme-gray] text-white rounded-[2rem] mt-[10px] px-[15px]  py-2" 
            type="button" 
            onClick={()=>{handleVoltarHomepage()}}>
                Voltar
            </button>
        </div>
    </>)}
        <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmModal}/>
    </>)
}

export default OrcamentoFinalizado