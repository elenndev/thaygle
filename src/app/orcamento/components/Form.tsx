import getValue from "@/app/components/FunctionProductValue"
import TypeOrcamento from "@/app/components/Type_orcamento"
import { useState } from "react"
import OrcamentoFinalizado from "./Orcamento";

// valores pra teste
    // pra ter m primeiro resultado que equivale a 0,(>5) 
        // #1 3 | 4.4 | deve arredondar pra 4 dutos
        // #2 3.70 | 7.2 | deve arredondar pra 7 dutos
        // #3 2.7 | 3.2 | deve arredondar pra 3 dutos
    // pra ter m primeiro resultado que equivale a 0,(<5 && >9) 
        // #1 3.60 - no caso x.799999
        // #2 5.30 | 13.6 | deve arredondar para 13.5 dutos
    // pra ter m primeiro resultado que equivale a 0,(<9) 
    // #1 2.12500000000006
    // [ 2.12500000000006, 2.3750000000005875, 2.625000000001115 ]

// const wallHeight_meters = 5.53


const FormQuote: React.FC<({
    produto_nome: string,
    produto: string, 
    produto_tipo: string, 
    isLaje: boolean})> = ({produto_nome, produto, produto_tipo, isLaje}) =>{

    // let orcamento: TypeOrcamento | undefined
    const [orcamento, setOrcamento] = useState<TypeOrcamento | undefined>(undefined)
    const [isOrcamento_concluido, setIsOrcamento_concluido] = useState(false)
    const [orcamentoErro, setOrcamentoErro] = useState<boolean | string>(false)
    const [qtProdutos, setQtProdutos] = useState(1)
    const valorUn_produto = getValue(produto, produto_tipo, 1)
    console.log('produto: ', valorUn_produto)
        if (valorUn_produto == 0){
            setOrcamentoErro("Erro ao buscar o valor unitário do produto")}
    const [tamParede_metros, setTamParede_metros] = useState(0)
    const alturaParede = tamParede_metros * 100 // cliente informa altura em metros mas pros calculos usamos sempre em cm
    // function handle_setTamParede(valorInput: string){
    //     if(valorInput.includes(",")){
    //         const stringFormatada = valorInput.replace(",",".")
    //         setTamParede_metros(parseFloat(stringFormatada))
    //     } else{
    //         setTamParede_metros(parseFloat(valorInput))
    //     }
    // }
    
    function getValorDecimal(number: number){
        const string = number.toString()
        const decimalPartIndex = string.indexOf('.')
        if(decimalPartIndex === -1 || decimalPartIndex + 1 >= string.length){
            return 0
        }

        return parseInt(string.charAt(decimalPartIndex + 1))
    }     
    function calcDutos(): number{
        const base = ( alturaParede - 190) /25
        function getDutos(base: number): number {
            const dec = getValorDecimal(base)
            console.log("anted de verificar dec ta como: ", dec)
            if(dec < 5){
                console.log(`valor da parede em cm ${alturaParede} | reesultado inicial: ${base} | valor do decimal: ${dec} | ou seja arredondar pra x.0`)
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
        return getDutos(base)
    }
    function calcModulos(): number{
        const base = ( alturaParede - 200) / 50
        function getModulos(base: number): number {
            const dec = getValorDecimal(base)
            console.log("anted de verificar dec ta como: ", dec)
            if(dec < 5){
                console.log(`valor da parede em cm ${alturaParede} | reesultado inicial: ${base} | valor do decimal: ${dec} | ou seja arredondar pra x.0`)
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
        return getModulos(base)
    }
    function valorTotal(){
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
            const soma = valorDutos?? + valorModulos?? + valorProduto
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
                <div className="set_qtProduto flex flex-row items-center justify-center">
                    <label htmlFor="set-qtProdutos" className="w-full block">Quantidade de {produto}s:</label>
                    <button className="bg-blue-700 text-[30px] w-[50px]" type="button" onClick={() => handle_setQtProduto(false)}>-</button>
                    <input className="text-black" type="number" name="set-qtProdutos" placeholder="Quantidade de itens" value={qtProdutos} onChange={(e) => {parseFloat(e.target.value)}}></input>
                    <button className="bg-blue-700 text-[30px] w-[50px]" type="button" onClick={() => handle_setQtProduto(true)}>+</button>
                </div>
            </>)
    }

    
    return(<>
        
        {isOrcamento_concluido && orcamento ? (
            <OrcamentoFinalizado getOrcamento={orcamento} alturaParede={tamParede_metros}/>
        ) : (<>
            <div className="bg-[--devScheme-white] px-[20px] shadow-md flex flex-col items-center justify-center gap-10 text-black rounded-sm max-w-[90%]">
            
            <form className="flex flex-col items-center justify-center p-[20px] ">
                {produto == 'churrasqueira' ? (<>
                    {produto_tipo == 'predial' && isLaje ? (
                        <>
                        <label htmlFor="wallHeight" className="block">Por favor informe a altura em metros do chão até a laje da área em que será instalada a churrasqueira</label>
                        </>
                    ):(
                        <>
                            <label htmlFor="wallHeight" className="block">Por favor informe a altura em metros do chão até o telhado da área em que será instalada a churrasqueira</label>
                        </>
                    )}                    
                    <input onChange={(e) => {setTamParede_metros(parseFloat(e.target.value.replace(",",".")))}} type="number" placeholder="tamanho em metros" className="text-black" name="wallHeight"></input>
                    <QuantProdutos />
                </>): (
                    <QuantProdutos />
                )}
            </form>
            <button type="button" onClick={valorTotal} className="bg-[--devScheme-softBlue] w-fit px-[10px] rounded-[20px] text-white">calcular</button>
            
            </div>
        </>)}
    </>)
}

export default FormQuote