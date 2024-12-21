'use client'
import Link from "next/link"
import Produtos from "./Produtos"
import TypeProduto from "./Type_produto"
import { useState} from "react"
import './style.css'
import Image from "next/image"
import controlCard from "./controlCard"


const CardProduto: React.FC<{produto: TypeProduto, isProdutoPrincipal: boolean}> = ({produto, isProdutoPrincipal}) =>{

    // elementos html
    const CardProdutoAberto: React.FC<{produto: TypeProduto}> = ({produto}) => {

        return(<>
            <div id={`bigCard_${produto.infos.produto}_${produto.infos.tipo}`} className={`hidden bg-[--devScheme-orange] h-full flex-col items-center justify-center text-white`}>
                <button type="button" onClick={()=>controlCard('close', `bigCard_${produto.infos.produto}_${produto.infos.tipo}`)}>Close</button>
                <Image width={200} height={200} alt={`Imagem do produto ${produto.nome}`} src="/logo.webp"/>
                <p className="font-bold nome-produto">{produto.nome}</p>
                <p>{produto.infos.descricao_completa}</p>
                <Link key={produto.id + 10} className="fazer-orcamento bg-blue-800 px-[10px] text-white text-center rounded-[10px]"
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
        <div id={`smallCard_${produto.infos.produto}_${produto.infos.tipo}`} className={`smallCard-produto ${produto.nome} relative w-full flex flex-row items-center justify-center 
        `}>
            {isProdutoPrincipal && (
                <Image width={200} height={200} alt={`Imagem do produto ${produto.nome}`} src="/logo.webp"/>
            )}
            <div className="produtos-info flex flex-col text-[--devScheme-gray]">
                <p className="font-bold nome-produto">{produto.nome}</p>
                <p>{produto.infos.breve_descricao}</p>
                {isProdutoPrincipal?(
                    <button type="button" onClick={() => controlCard('open',`bigCard_${produto.infos.produto}_${produto.infos.tipo}`)} className="fazer-orcamento bg-blue-800 text-white rounded-[10px]">Ver produto</button>
                ):(
                    <Link key={produto.id + 10} className="fazer-orcamento bg-blue-800 text-white text-center rounded-[10px]"
                    href={{pathname:'/orcamento', 
                    query: {
                        produto_nome: produto.nome,
                        produto: produto.infos.produto, 
                        tipo: produto.infos.tipo,
                        nome: produto.nome
                    }}}>Fazer orçamento</Link>

                )}
            </div>


        </div> 
</>)
}


const ListaProdutos = () =>{
    const principaisProdutos = Produtos.filter((produto)=> produto.infos.produto == 'churrasqueira')
    console.log("produtos: ", principaisProdutos)
    const [catalogoCompleto, setCatalogoCompleto] = useState(false)
    const outrosProdutos = Produtos.filter((produto) => produto.infos.produto != 'churrasqueira')

    function getTodosProdutos(){
        setCatalogoCompleto(true)
    }

    const Principais = () => {
        return(<>
            <div className="produtos-principais flex flex-col gap-y-[20px] gap-x-[10px] w-fit items-center justify-center">
                {principaisProdutos.map((produto) => (
                    <CardProduto key={produto.id} produto={produto} isProdutoPrincipal={true}/>                    
                ))}
            </div>
        </>)
    }
    const OutrosProdutos = () => {

        return(<>
            <p className={`text-[1rem] text-[--devScheme-gray] w-[80%] text-center border-t border-[--devScheme-gray]`}>Outros produtos</p>
            <div className={`outros-produtos flex flex-row flex-wrap gap-20 w-full items-center justify-center`}>
                {outrosProdutos.map((produto) => (
                    <CardProduto key={produto.id} produto={produto} isProdutoPrincipal={false}/>                    
                ))}
            </div>
        </>)
    }

    return(
        <><div className="catalogo bg-[--devScheme-white] min-h-[fit] flex flex-col w-full items-center flex-wrap justify-center gap-y-[30px]">
            <Principais />
            {catalogoCompleto ? (<>
                <OutrosProdutos />
                <button className="bg-[--devScheme-softBlue]" type="button" onClick={()=> {setCatalogoCompleto(false)}}>Ocultar</button>
            </>):(<>
                <button className="bg-[--devScheme-softBlue]" type="button" onClick={()=> {getTodosProdutos()}}>Ver todos os produtos</button>
            </>)}
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