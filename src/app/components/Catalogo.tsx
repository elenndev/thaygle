'use client'
import Link from "next/link"
import Produtos from "./Produtos"
import TypeProduto from "./Type_produto"
import { useState } from "react"
import './style.css'


function PrincipaisProdutos(){
const principaisProdutos = Produtos.filter((produto)=> produto.infos.produto == 'churrasqueira')
console.log("produtos: ", principaisProdutos)
const [catalogoCompleto, setCatalogoCompleto] = useState(false)
const [outrosProdutos, setOutrosProdutos] = useState<TypeProduto[] | []>([])
function getTodosProdutos(){
    setOutrosProdutos(Produtos.filter((produto) => produto.infos.produto != 'churrasqueira'))
    setCatalogoCompleto(true)
}

    return(
        <><div className="catalogo bg-[--devScheme-white] flex flex-col w-full items-center justify-center gap-y-[30px]">
            <p className="text-[2rem] text-[--devScheme-gray]">Catálogo</p>
            <div className="produtos-principais flex flex-row gap-20 w-full items-center justify-center">
                {principaisProdutos.map((produto, index) => (
                    <div key={index} className={`produto ${produto.nome}`}>
                        <p className="nome-produto">{produto.nome}</p>
                        <p>{produto.infos.breve_descricao}</p>
                        <Link className="fazer-orcamento bg-blue-800 text-white rounded-[10px]"
                        href={{pathname:'/orcamento', 
                        query: {
                            produto_nome: produto.nome,
                            produto: produto.infos.produto, 
                            tipo: produto.infos.tipo,
                            nome: produto.nome
                        }}}>Fazer orçamento</Link>
                    </div>                    
                ))}
            </div>
            <div className="outros-produtos flex flex-row gap-20 w-full items-center justify-center">
            <p className="text-[1rem] text-[--devScheme-gray]">Outros produtos</p>
                {catalogoCompleto && outrosProdutos.length > 0 && (<>
                    {outrosProdutos.map((produto, index)=>(<>
                        <div key={index} className={`produto outrosProdutos ${produto.nome}`}>
                        <p className="nome-produto">{produto.nome}</p>
                        <p>{produto.infos.breve_descricao}</p>
                        <Link className="fazer-orcamento bg-blue-800 text-white rounded-[10px]"
                        href={{pathname:'/orcamento', 
                        query: {
                            produto_nome: produto.nome,
                            produto: produto.infos.produto, 
                            tipo: produto.infos.tipo,
                            nome: produto.nome
                        }}}>Fazer orçamento</Link>
                    </div> 
                    </>))}
                </>)}
            </div>
            {catalogoCompleto? (<>
                <button type="button" onClick={()=> {setCatalogoCompleto(false)}}>Ocultar</button>
            </>):(<>
                <button type="button" onClick={()=> {getTodosProdutos()}}>Ver todos os produtos</button>
            </>)}
        </div>
        </>
    )
}


const Catalogo = () =>{
    return(
        <div className="produtos w-[90%] items-center justify-center flex-row flex-wrap">
            <PrincipaisProdutos />
        </div>
    )
}
export default Catalogo