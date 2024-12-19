'use client'
import Link from "next/link"
import Produtos from "./Produtos"
import TypeProduto from "./Type_produto"
import { useState, useEffect } from "react"
import './style.css'


const CardProduto: React.FC<{produto: TypeProduto}> = ({produto}) =>{
    return(<>
        <div className={`produto ${produto.nome} w-full flex flex-row items-center justify-center 
        `}>
            <p className="nome-produto">{produto.nome}</p>
            <p>{produto.infos.breve_descricao}</p>
            <Link key={produto.id + 10} className="fazer-orcamento bg-blue-800 text-white rounded-[10px]"
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
                    <CardProduto key={produto.id} produto={produto}/>                    
                ))}
            </div>
        </>)
    }
    const OutrosProdutos = () => {

        return(<>
            <p className={`text-[1rem] text-[--devScheme-gray] w-[80%] text-center border-t border-[--devScheme-gray]`}>Outros produtos</p>
            <div className={`outros-produtos flex flex-row flex-wrap gap-20 w-full items-center justify-center`}>
                {outrosProdutos.map((produto) => (
                    <CardProduto key={produto.id} produto={produto}/>                    
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
        <div className="produtos flex w-[90%] items-center justify-center flex-row flex-wrap">
            <ListaProdutos />
        </div>
    )
}
export default Catalogo