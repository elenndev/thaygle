import TypeOrcamento from "@/app/components/Type_orcamento";
import { useState, useEffect } from "react";

const OrcamentoFinalizado: React.FC<{getOrcamento: TypeOrcamento, alturaParede: number}> = ({getOrcamento, alturaParede}) => {
    const [isDesconto, setIsDesconto] = useState(false)
    const [orcamento, setOrcamento] = useState<TypeOrcamento>(getOrcamento)

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
            <span className="ask desconto grid grid-cols-2 gap-4 w-[50%]">
                <p className="col-span-2">O pagamento seria no Pix?</p>
                <button type="button" className="bg-blue-700 text-white rounded-sm p-2" onClick={()=> setIsDesconto(true)}>Sim</button>
                <button type="button" className="bg-blue-700 text-white rounded-sm  p-2" onClick={()=> setIsDesconto(false)}>Não</button>
        </span>    
        </>)
    }
    return(<>
    <div className=" flex flex-col bg-white text-black items-center justify-center">
        <p>Orçamento finalizado</p>
        <p>Orçamento: {orcamento.produto}</p>
        <p>Altura da parede: {alturaParede}m</p>
        <p>Quantidade de dutos: {orcamento.dutos.qt}</p>
        <p>Valor dos dutos: R${orcamento.dutos.valor}</p>
        {orcamento.modulos.qt > 0 && (<>
            <p>Quantidade de modulos: {orcamento.modulos.qt}</p>
            <p>Valor dos modulos: R${orcamento.modulos.valor}</p>
        </>)}
        <PerguntaDesconto />
        <p> Valor sem desconto: R${orcamento.soma}</p>
        <p>Desconto: R${orcamento.desconto}</p>
        <p>Valor total: R${orcamento.total}</p>

    </div>
    </>)
}

export default OrcamentoFinalizado