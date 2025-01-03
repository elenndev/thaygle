import getValue from "@/app/components/FunctionProductValue"
import TypeOrcamento from "@/app/components/Type_orcamento"
import { useState, useEffect } from "react"
import OrcamentoFinalizado from "./OrcamentoFinalizado";
import Link from "next/link";
import TypeDadosCliente from "@/app/components/Type_dadosCliente";
type TypeVariacao = {
    id: number,
    nome_variacao: string,
    imagem_variacao: string
}

const FormQuote: React.FC<({
    produto_nome: string,
    produto: string, 
    produto_tipo: string, 
    isLaje: boolean,
    dadosCliente: TypeDadosCliente | null
    variacoes: TypeVariacao[] | null})> = ({produto_nome, produto, produto_tipo, isLaje, dadosCliente, variacoes}) =>{

    const [orcamento, setOrcamento] = useState<TypeOrcamento | undefined>(undefined)
    const [isOrcamento_concluido, setIsOrcamento_concluido] = useState(false)
    const [orcamentoErro, setOrcamentoErro] = useState<boolean | string>(false)
    const [variacao, setVariacao] = useState<string | undefined>(undefined)
    useEffect(() => {
        if (produto_tipo === 'predial') {
            setVariacao('Natural');
        }
    }, [produto_tipo]);
    const [qtProdutos, setQtProdutos] = useState(1)
    const valorUn_produto = getValue(produto, produto_tipo, 1)
        if (valorUn_produto == 0){
            setOrcamentoErro("Erro ao buscar o valor unitário do produto")}
    const [tamParede_metros, setTamParede_metros] = useState(0)
    const [tamLaje_metros, setTamLaje_metros] = useState(0)
    const alturaParede = (tamParede_metros * 100)  + (tamLaje_metros * 100) // cliente informa altura em metros mas pros calculos usamos sempre em cm
    
    function getValorDecimal(number: number){
        const string = number.toString()
        const decimalPartIndex = string.indexOf('.')
        if(decimalPartIndex === -1 || decimalPartIndex + 1 >= string.length){
            return 0
        }

        return parseInt(string.charAt(decimalPartIndex + 1))
    }
    function arredondarResultado(dec: number, base: number){
        if(dec < 5){
            return Math.floor(base)
        } else if (dec >= 5 && dec < 9){
            return parseFloat(`${base.toString().split('.')[0]}.5`)
        } else if (dec > 9){
            return Math.ceil(base)
        } else{
            return 0
        }
    }     
    function calcDutos(): number{
        const base = ( alturaParede - 190) /25
        function getDutos(base: number): number {
            const dec = getValorDecimal(base)
            if (dec >= 1){
                return Math.floor(base) + 2
            } else { return base + 1}
        }       
        return getDutos(base)
    }
    function calcModulos(): number{
        const base = ( alturaParede - 200) / 50
        function getModulos(base: number): number {
            const dec = getValorDecimal(base)
            return arredondarResultado(dec, base)            
        }       
        return getModulos(base)
    }
    function valorTotal(e: React.FormEvent){
        e.preventDefault()
        const perguntaLaje = document.querySelector('.perguntaLaje')
        perguntaLaje?.classList.remove('flex')
        perguntaLaje?.classList.add('hidden')
        const qtDutos = calcDutos()
        let valorDutos = 0
        let qtModulos = 0
        let valorModulos = 0     

        if(produto == 'churrasqueira'){
            if(produto_tipo == 'predial'){
                qtModulos = calcModulos()
                valorModulos = getValue('modulo', 'predial', qtModulos) ?? 0
                valorDutos = getValue('duto', 'liso', qtDutos) ?? 0
            } else if (produto_tipo == 'tijolinho' || produto_tipo == 'tijolinho balcao'){
                valorDutos = getValue('duto', 'tijolinho', qtDutos) ?? 0
            }


            const valorProduto = qtProdutos * valorUn_produto
            const soma = valorDutos + valorModulos + valorProduto
            setOrcamento({
                produto: produto_nome,
                total: soma,
                soma: soma,
                desconto: 0,
                dutos: {qt: qtDutos, valor: valorDutos},
                modulos: {qt: qtModulos, valor: valorModulos}
            })
        } else {
            const valorProduto = qtProdutos * valorUn_produto
            const soma =  valorProduto
            setOrcamento({
                produto: produto_nome,
                total: soma,
                soma: soma,
                desconto: 0,
                dutos: {qt: qtDutos, valor: valorDutos},
                modulos: {qt: qtModulos, valor: valorModulos}
            })
        }
        setIsOrcamento_concluido(true)
    }
    function handle_setQtProduto(add: boolean){
        const novaQt = add? qtProdutos + 1 : qtProdutos - 1
        setQtProdutos(novaQt)
    }


    // Elementos HTML
    if (orcamentoErro){
        window.alert(orcamentoErro)
    }

    const EscolherVariacao = ()=>{
        const handleEscolherVariacao = (event: React.ChangeEvent<HTMLSelectElement>) => {
            setVariacao(event.target.value)
        };

        if (!variacoes || variacoes.length <= 1) {
            return <div><p>Variação padrão</p></div>;
        }
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
                        <option key={variacaoItem.id} value={variacaoItem.nome_variacao}>
                            {variacaoItem.nome_variacao}
                        </option>
                        ))}
                    </select>
                </span>
                </div>
        </>)
    }


    const QuantProdutos = () =>{
        return(<>
                <div className="set_qtProduto w-full mt-[10px] flex flex-wrap items-center justify-center">
                    <label htmlFor="set-qtProdutos" className="flex">Quantidade de {produto}s pro orçamento:</label>
                    <span className="w-full h-fit flex items-center justify-center mb-2">
                        <button className="text-[35px] w-fit h-fit" type="button" onClick={() => handle_setQtProduto(false)}>-</button>
                        <input className="text-[--devScheme-gray] w-[20%] mx-[15px]" type="number" name="set-qtProdutos" placeholder="Quantidade de itens" value={qtProdutos} onChange={(e) => {parseFloat(e.target.value)}}></input>
                        <button className="text-[32px] text-[--devScheme-gray] w-fit h-fit" type="button" onClick={() => handle_setQtProduto(true)}>+</button>
                    </span>
                </div>
            </>)
    }

    
    return(<>
        
        {isOrcamento_concluido && orcamento ? (
            <OrcamentoFinalizado dadosCliente={dadosCliente} getOrcamento={orcamento} alturaParede={alturaParede / 100} produtoInfo={produto} produtoVariacao={variacao}/>
        ) : (<>
            <div className=" w-fit px-[20px] flex flex-col items-center justify-center gap-10 text-black rounded-sm max-w-[95%]">
            
            <form onSubmit={valorTotal} className="form-orcamento relative flex flex-col items-center gap-x-[10px] justify-evenly p-[20px]w-full">
                    {produto_tipo == 'predial' && isLaje ? (
                        <>
                        <label htmlFor="alturaParede">Por favor informe a altura em <strong>metros</strong> do chão até a laje da área em que será instalada a churrasqueira:</label>
                        <input onChange={(e) => {setTamParede_metros(parseFloat(e.target.value.replace(",",".")))}} type="number" placeholder="tamanho em metros..." className="altura-parede border-[--devScheme-orange] border border-solid rounded-lg text-black" name="alturaParede" required min={1}></input>
                        <label htmlFor="alturaLaje">Por favor informe a altura em <strong>metros</strong> da laje até o telhado:</label>
                        <input onChange={(e) => {setTamLaje_metros(parseFloat(e.target.value.replace(",",".")))}} type="number" placeholder="tamanho em metros..." className="altura-laje border-[--devScheme-orange] border border-solid rounded-lg text-black" name="alturaLaje" required min={1}></input>
                        </>
                    ):(
                        <>
                            <label htmlFor="alturaParede" className="block">Por favor informe a altura em <strong>metros</strong> do chão até o telhado da área em que será instalada a churrasqueira</label>
                            <input onChange={(e) => {setTamParede_metros(parseFloat(e.target.value.replace(",",".")))}} type="number" placeholder="tamanho em metros..." className="altura-parede border-[--devScheme-orange] border border-solid rounded-lg text-black" name="alturaParede" required min={1}></input>
                        </>
                    )}
                    {variacoes != null && variacoes?.length > 1 && (
                        <EscolherVariacao />
                    )}
                    <QuantProdutos />
                <button type="submit" className="calcular w-fit py-[3px] mb-[10px] px-[30px] rounded-[30px] bg-[--devScheme-orange] text-white">calcular</button>
            </form>
            <Link href="/" aria-label="Voltar a página inicial" className="w-fit py-[3px] px-[20px] rounded-[30px] bg-[--devScheme-gray] text-white p-2">Voltar</Link>
            </div>
        </>)}
    </>)
}

export default FormQuote