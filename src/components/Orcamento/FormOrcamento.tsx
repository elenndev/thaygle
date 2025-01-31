import { useState } from "react"
import OrcamentoFinalizado from "./DivOrcamentoFinalizado";
import Link from "next/link";
import { TypeDadosCliente, TypeOrcamento } from "../../types";
import { useOrcamento } from "./use-Orcamento";

type TypeVariacao = {
    id: number,
    nome_variacao: string,
    imagem_variacao: string}


type formProps = {
    produto_nome: string,
    produto: string, 
    produto_tipo: string, 
    isLaje: boolean,
    dadosCliente: TypeDadosCliente | null
    variacoes: TypeVariacao[] | null
}
export const FormOrcamento  = (props: formProps) =>{
    const { produto_nome, produto, produto_tipo, isLaje, dadosCliente, variacoes } = props
    const [orcamento, setOrcamento] = useState<TypeOrcamento | undefined>(undefined)
    const [isOrcamentoConcluido, setIsOrcamentoConcluido] = useState(false)
    const [variacao, setVariacao] = useState<string | undefined>(undefined)
    if (produto_tipo === 'predial') {
        setVariacao('Natural');}
    
    const [qtProdutos, setQtProdutos] = useState(1)
    const [tamParede_metros, setTamParede_metros] = useState(0)
    const [tamLaje_metros, setTamLaje_metros] = useState(0)
    
    const alturaParede = (tamParede_metros * 100)  + (tamLaje_metros * 100) // cliente informa altura em metros mas pros calculos usamos sempre em cm

    const { valorTotal } = useOrcamento()

    function handleCalcularOrcamento(e: React.FormEvent){
        e.preventDefault()
        function concluir(status: boolean, orcamento: TypeOrcamento | undefined){
            setIsOrcamentoConcluido(status)
            setOrcamento(orcamento)
        }
        valorTotal({props: {
            alturaParede: alturaParede,
            nome: produto_nome,
            produto: produto,
            tipo: produto_tipo,
            qtProdutos: qtProdutos,
            callback: concluir}})
    }
    function handle_setQtProduto(add: boolean){
        const novaQt = add? qtProdutos + 1 : qtProdutos - 1
        setQtProdutos(novaQt)
    }

    
    const SelectEscolherVariacao = ()=>{
        const handleEscolherVariacao = (event: React.ChangeEvent<HTMLSelectElement>) => {
            setVariacao(event.target.value)
        };

        if (!variacoes || variacoes.length <= 1) {
            return <div><p>Variação padrão</p></div>;}

        return(<>
            <div className="flex flex-col py-[10px]">
                <label htmlFor="variacao">Escolha a variação:</label>
                <span className="flex">
                    <select className="px-[10px] py-[2px] rounded-[10px]"
                        id="variacao"
                        value={variacao}
                        onChange={handleEscolherVariacao}
                        required
                    >
                        <option value="">Selecione uma variação</option>

                        {variacoes.map((variacaoItem) => (
                        <option key={variacaoItem.id} 
                        value={variacaoItem.nome_variacao}>
                            {variacaoItem.nome_variacao}
                        </option>
                        ))}
                    </select>
                </span>
                </div>
        </>)
    }
    const InputQuantProdutos = () =>{
        return(<>
                <div className="set_qtProduto w-full mt-[10px] flex flex-wrap items-center justify-center">
                    <label htmlFor="set-qtProdutos" className="flex">Quantidade de {produto}s pro orçamento:</label>
                    <span className="w-full h-fit flex items-center justify-center mb-2">
                        <button className="text-[35px] w-fit h-fit" 
                        type="button" 
                        onClick={() => handle_setQtProduto(false)}>
                            -
                        </button>
                        <input className="text-[--devScheme-gray] w-[20%] mx-[15px]" 
                        type="number" 
                        name="set-qtProdutos" 
                        placeholder="Quantidade de itens" 
                        value={qtProdutos} 
                        onChange={(e) => {parseFloat(e.target.value)}}></input>
                        <button className="text-[32px] text-[--devScheme-gray] w-fit h-fit" 
                        type="button" 
                        onClick={() => handle_setQtProduto(true)}>+</button>
                    </span>
                </div>
            </>)
    }
    
    return(<>
        
        {isOrcamentoConcluido && orcamento ? (
            <OrcamentoFinalizado props={{
                dadosCliente:dadosCliente,
                getOrcamento:orcamento,
                alturaParede:alturaParede / 100, //Já envia convertido pra metros pro orcamento finalizado
                produtoInfo:produto,
                produtoVariacao:variacao}
            }
           />
        ) : (<>
            <div className=" w-fit px-[20px] flex flex-col items-center justify-center gap-10 text-black rounded-sm max-w-[95%]">
            
            <form onSubmit={handleCalcularOrcamento} 
            className="form-orcamento relative flex flex-col items-center gap-x-[10px] justify-evenly p-[20px]w-full">
                    {produto_tipo == 'predial' && isLaje ? (
                        <>
                        <label htmlFor="alturaParede">
                            Por favor informe a altura em <strong>metros</strong> do chão até a laje da área em que será instalada a churrasqueira:
                        </label>
                        <input onChange={(e) => {setTamParede_metros(parseFloat(e.target.value.replace(",",".")))}} 
                        type="number" 
                        placeholder="tamanho em metros..." 
                        className="altura-parede border-[--devScheme-orange] border border-solid rounded-lg text-black" 
                        name="alturaParede" 
                        required min={1}></input>
                        <label htmlFor="alturaLaje">
                            Por favor informe a altura em <strong>metros</strong> da laje até o telhado:
                        </label>
                        <input onChange={(e) => {setTamLaje_metros(parseFloat(e.target.value.replace(",",".")))}} type="number" 
                        placeholder="tamanho em metros..." 
                        className="altura-laje border-[--devScheme-orange] border border-solid rounded-lg text-black" 
                        name="alturaLaje" 
                        required min={1}></input>
                        </>
                    ):(
                        <>
                            <label htmlFor="alturaParede" 
                            className="block">
                                Por favor informe a altura em <strong>metros</strong> do chão até o telhado da área em que será instalada a churrasqueira:
                            </label>
                            <input onChange={(e) => {setTamParede_metros(parseFloat(e.target.value.replace(",",".")))}} 
                            type="number" 
                            placeholder="tamanho em metros..." 
                            className="altura-parede border-[--devScheme-orange] border border-solid rounded-lg text-black" 
                            name="alturaParede" required min={1}></input>
                        </>
                    )}
                    {variacoes != null && variacoes?.length > 1 && (
                        <SelectEscolherVariacao />
                    )}
                    <InputQuantProdutos />
                <button type="submit" 
                className="calcular w-fit py-[3px] mb-[10px] px-[30px] rounded-[30px] bg-[--devScheme-orange] text-white">
                    calcular
                </button>
            </form>
            <Link href="/" 
            aria-label="Voltar a página inicial" 
            className="w-fit py-[3px] px-[20px] rounded-[30px] bg-[--devScheme-gray] text-white p-2">
                Voltar
            </Link>
            </div>
        </>)}
    </>)
}
