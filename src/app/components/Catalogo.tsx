'use client'
import Link from "next/link"
import Produtos from "./Produtos"
import TypeProduto from "./Type_produto"
import { useState} from "react"
import './style.css'
import Image from "next/image"


const CardProduto: React.FC<{produto: TypeProduto, isProdutoPrincipal: boolean}> = ({produto, isProdutoPrincipal}) =>{
    const [display, setDisplay] = useState("hidden")

    function openCard(){
        setDisplay('flex')
    }

    function closeCard(){
        setDisplay('hidden')
    }

    // elementos html
    const CardProdutoAberto: React.FC<{produto: TypeProduto}> = ({produto}) => {
        return(<>
            <div className={`${display} h-[90%] w-[90%] bg-[--devScheme-orange] flex-col items-center justify-center text-white`}>
                <button type="button" onClick={()=>closeCard()}>Close</button>
                <Image width={300} height={300} alt={`Imagem do produto ${produto.nome}`} src="/logo.webp"/>
                <p className="font-bold nome-produto">{produto.nome}</p>
                <p>{produto.infos.descricao_completa}</p>
                <Link key={produto.id + 10} className="fazer-orcamento bg-blue-800 text-white text-center rounded-[10px]"
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
        <div className={`card-produto ${produto.nome} w-full flex flex-row items-center justify-center 
        `}>
            {isProdutoPrincipal && (
                <Image width={200} height={200} alt={`Imagem do produto ${produto.nome}`} src="/logo.webp"/>
            )}
            <div className="produtos-info flex flex-col">
                <p className="font-bold nome-produto">{produto.nome}</p>
                <p>{produto.infos.breve_descricao}</p>
                {isProdutoPrincipal?(
                    <button type="button" onClick={() => openCard()} className="fazer-orcamento bg-blue-800 text-white rounded-[10px]">Ver produto</button>
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
        <CardProdutoAberto produto={produto} />
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
            <p className="text-[2rem] text-[--devScheme-gray] sm:bg-red-600">Catálogo</p>
            <Principais />

            {catalogoCompleto? (<>
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
            <h2 className="text-[--devScheme-grat]">Produtos</h2>
            <ListaProdutos />
        </section>
    )
}
export default Catalogo