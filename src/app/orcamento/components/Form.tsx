import getValue from "@/app/components/FunctionProductValue"
import TypeOrcamento from "@/app/components/Type_orcamento"
import { useState } from "react"
import OrcamentoFinalizado from "./Orcamento";
import Link from "next/link";
import TypeDadosCliente from "@/app/components/Type_dadosCliente";


const FormQuote: React.FC<({
    produto_nome: string,
    produto: string, 
    produto_tipo: string, 
    isLaje: boolean,
    dadosCliente: TypeDadosCliente | null})> = ({produto_nome, produto, produto_tipo, isLaje, dadosCliente}) =>{

    const [orcamento, setOrcamento] = useState<TypeOrcamento | undefined>(undefined)
    const [isOrcamento_concluido, setIsOrcamento_concluido] = useState(false)
    const [orcamentoErro, setOrcamentoErro] = useState<boolean | string>(false)
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
            console.log(`valor da parede em cm ${alturaParede} | resultado inicial: ${base} | valor do decimal: ${dec} | ou seja arredondar pra x.0`)
            return Math.floor(base)
        } else if (dec >= 5 && dec < 9){
            console.log(`valor da parede em cm ${alturaParede} | reesultado inicial: ${base} | valor do decimal: ${dec} | ou seja arredondar pra x.5`)
            return parseFloat(`${base.toString().split('.')[0]}.5`)
        } else if (dec > 9){
            console.log(dec, " vai arredonda pro proximo numero inteiro")
            console.log(`valor da parede em cm ${alturaParede} | reesultado inicial: ${base} | valor do decimal: ${dec} | ou seja arredondar pro inteiro seguinte`)
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
            console.log("anted de verificar dec ta como: ", dec)
            return arredondarResultado(dec, base)            
        }       
        return getModulos(base)
    }
    function valorTotal(){
        console.log("aa", alturaParede)
        const perguntaLaje = document.querySelector('.perguntaLaje')
        perguntaLaje?.classList.remove('flex')
        perguntaLaje?.classList.add('hidden')
        if (tamParede_metros<2.24 && produto =='churrasqueira'){
            window.alert("Por favor informe um valor válido para o tamanho da parede")
            return
        }
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
            console.log("valor calculado do produto: ", valorProduto)
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
            <OrcamentoFinalizado dadosCliente={dadosCliente} getOrcamento={orcamento} alturaParede={alturaParede / 100} produtoInfo={produto}/>
        ) : (<>
            <div className=" w-fit px-[20px] flex flex-col items-center justify-center gap-10 text-black rounded-sm max-w-[95%]">
            
            <form className="form-orcamento relative flex flex-col items-center gap-x-[10px] justify-evenly p-[20px]w-full">
                {produto == 'churrasqueira' ? (<>
                    {produto_tipo == 'predial' && isLaje ? (
                        <>
                        <label htmlFor="alturaParede">Por favor informe a altura em <strong>metros</strong> do chão até a laje da área em que será instalada a churrasqueira:</label>
                        <input onChange={(e) => {setTamParede_metros(parseFloat(e.target.value.replace(",",".")))}} type="number" placeholder="tamanho em metros..." className="altura-parede border-[--devScheme-orange] border border-solid rounded-lg text-black" name="alturaParede"></input>
                        <label htmlFor="alturaLaje">Por favor informe a altura em <strong>metros</strong> da laje até o telhado:</label>
                        <input onChange={(e) => {setTamLaje_metros(parseFloat(e.target.value.replace(",",".")))}} type="number" placeholder="tamanho em metros..." className="altura-laje border-[--devScheme-orange] border border-solid rounded-lg text-black" name="alturaLaje"></input>
                        </>
                    ):(
                        <>
                            <label htmlFor="alturaParede" className="block">Por favor informe a altura em <strong>metros</strong> do chão até o telhado da área em que será instalada a churrasqueira</label>
                            <input onChange={(e) => {setTamParede_metros(parseFloat(e.target.value.replace(",",".")))}} type="number" placeholder="tamanho em metros..." className="altura-parede border-[--devScheme-orange] border border-solid rounded-lg text-black" name="alturaParede"></input>
                        </>
                    )}                    
                    <QuantProdutos />
                </>): (
                    <QuantProdutos />
                )}
            </form>
            <button type="button" onClick={valorTotal} className="calcular w-fit py-[3px] px-[30px] rounded-[30px] bg-[--devScheme-orange] text-white">calcular</button>
            <Link href="/" aria-label="Voltar a página inicial" className="w-fit py-[3px] px-[20px] rounded-[30px] bg-[--devScheme-gray] text-white p-2">Voltar</Link>
            </div>
        </>)}
    </>)
}

export default FormQuote