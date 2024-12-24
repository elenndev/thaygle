'use client'
import Link from "next/link"
import './style.css'
import Image from "next/image"
import controlCard from "./controlCard"
import Churrasqueiras from "./Churrasqueiras"
import TypeChurrasqueira from "./Type_churrasqueira"
import { useState } from "react"


const CardProduto: React.FC<{produto: TypeChurrasqueira}> = ({produto}) =>{

    // elementos html
    const CardProdutoAberto: React.FC<{produto: TypeChurrasqueira}> = ({produto}) => {
        type listaVariacao = {
            id: number;
            nome_variacao: string;
            imagem_variacao: string;
        }
        const variacoes = produto.detalhes.variacoes
        console.log(variacoes)
        const [imagemEsquerda, setImagemEsquerda] = useState<listaVariacao>(variacoes[0])
        const [imagemCentro, setImagemCentro] = useState<listaVariacao>(variacoes[1])
        const [imagemDireita, setImagemDireita] = useState<listaVariacao>(variacoes[3])
        // const [imagemDireito, setImagemDireito] = useState<listaVariacao>(variacoes[1])

        function controleGaleria(acao: string,imagemAtual: listaVariacao){
            // const qt_variacoes = variacoes.length - 1
            if (acao == "anterior"){
                const imagemEsquerdaAtual = imagemAtual
                const imagemCentroAtual = imagemCentro
                if(imagemEsquerdaAtual.id == 0){
                    setImagemEsquerda(variacoes[(variacoes.length - 1)])
                } else{
                    setImagemEsquerda(variacoes[(imagemEsquerdaAtual.id - 1)])
                }
                setImagemDireita(imagemCentroAtual)
                setImagemCentro(imagemEsquerdaAtual)
            } else if (acao == "proxima"){
                const imagemDireitaAtual = imagemAtual
                const imagemCentroAtual = imagemCentro
                if(imagemDireitaAtual.id == variacoes.length - 1){
                    setImagemDireita(variacoes[1])
                }else{
                    setImagemDireita(variacoes[(imagemDireitaAtual.id + 1)])
                }
                setImagemCentro(imagemDireitaAtual)
                setImagemEsquerda(imagemCentroAtual)
            }
        }


        return(<>
            <div id={`bigCard_${produto.infos.produto.replace(" ","_")}_${produto.infos.tipo.replace(" ","_")}`} className={`hidden bg-[--devScheme-white] h-[90vh] w-[90vw] flex-col items-center justify-between text-[--devScheme-gray] border-solid border-[--devScheme-orange] border-2 font-[1.5rem]`}>
                <button type="button" onClick={()=>controlCard('close', `bigCard_${produto.infos.produto}_${produto.infos.tipo}`)}>Close</button>
                <span className={`galeria items-center justify-center ${variacoes.length >= 3 ? "grid grid-cols-3 grid-rows-1" : "flex flex-row"}`}>
                    {variacoes.length >= 3 ? (<>
                        <Image width={100} height={100} className={`esquerdo`} alt={`Imagem da variação do produto`} src={imagemEsquerda.imagem_variacao} onClick={() => controleGaleria("anterior",imagemEsquerda)}/>
                        <div className="imagem-centro flex flex-col w-fit gap-y-[10px]">
                            <Image width={300} height={300} className={`centro`} alt={`Imagem da variação do produto`} src={imagemCentro.imagem_variacao}/>
                            <p>{imagemCentro.nome_variacao}</p>
                        </div>
                        <Image width={100} height={100} className={`direito`} alt={`Imagem da variação do produto`} src={imagemDireita.imagem_variacao} onClick={()=> controleGaleria("proxima", imagemDireita)}/>
                    </>): (<>
                        <Image width={300} height={300} className={`centro`} alt={`Imagem da variação do produto`} src={imagemEsquerda.imagem_variacao}/>
                    </>)}
                </span>
                <p className="font-bold nome-produto flex w-[90%]">{produto.nome}</p>
                <p className="flex w-[90%]">{produto.infos.descricao_completa}</p>
                {produto.detalhes.listas?.map((detalhe, index) => (
                    <ul key={index} className={`${detalhe.nome_lista}`}>
                        <p>{detalhe.nome_lista}</p>
                        {detalhe.itens_lista?.map((detalhe_item,index)=> (
                            <li key={index} className="detalhe">{detalhe_item}</li>)
                        )}
                    </ul>
                ))}
                <Link key={produto.id + 10} className="fazer-orcamento bg-[--devScheme-orange] px-[20px] py-[10px] text-white text-center rounded-[10px]"
                    href={{pathname:'/orcamento', 
                    query: {
                        produto_nome: produto.nome,
                        produto: produto.infos.produto, 
                        tipo: produto.infos.tipo,
                        nome: produto.nome
                    }}}>Fazer orçamento</Link>
            </div>
        </>)
    }

    return(<>
        <CardProdutoAberto produto={produto}/>
        <div id={`smallCard_${produto.infos.produto.replace(" ","_")}_${produto.infos.tipo.replace(" ","_")}`} className={`smallCard-produto ${produto.nome} relative w-full flex flex-row items-center justify-center 
        `}>
            <Image width={200} height={200} alt={`Imagem do produto ${produto.nome}`} src="/logo.webp"/>
            <div className="produtos-info flex flex-col text-[--devScheme-gray]">
                <p className="font-bold nome-produto">{produto.nome}</p>
                <p>{produto.infos.breve_descricao}</p>
                <button type="button" onClick={() => controlCard('open',`bigCard_${produto.infos.produto}_${produto.infos.tipo}`)} className="fazer-orcamento bg-[--devScheme-orange] px-[10px] py-[2px] text-white rounded-[10px]">Ver produto</button>
            </div>


        </div> 
</>)
}


const ListaProdutos = () =>{
    const principaisProdutos = Churrasqueiras
    console.log("produtos: ", principaisProdutos)


    const Principais = () => {
        return(<>
            <div className="produtos-principais flex flex-col gap-y-[20px] gap-x-[10px] w-fit items-center justify-center">
                {principaisProdutos.map((produto) => (
                    <CardProduto key={produto.id} produto={produto}/>                    
                ))}
            </div>
        </>)
    }

    return(
        <><div className="catalogo bg-[--devScheme-white] min-h-[fit] flex flex-col w-full items-center flex-wrap justify-center gap-y-[30px]">
            <Principais />
        </div>
        </>
    )
}


const Catalogo = () =>{
    return(
        <section id="produtos" className="produtos bg-[--devScheme-white] flex h-screen w-screen items-center justify-center flex-row flex-wrap">
            <h2 className="text-[--devScheme-gray] text-[2rem] font-bold">Produtos</h2>
            <ListaProdutos />
        </section>
    )
}
export default Catalogo