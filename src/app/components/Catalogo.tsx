import Link from "next/link"
import Produtos from "./Produtos"
import TypeProduto from "./Type_produto"
import { useState } from "react"


function PrincipaisProdutos(){
const principaisProdutos = Produtos.filter((produto)=> produto.infos.produto == 'churrasqueira')
console.log("produtos: ", principaisProdutos)
const [catalogoCompleto, setCatalogoCompleto] = useState(false)
let outrosProdutos: TypeProduto[] | [];
outrosProdutos = []
function getTodosProdutos(){
    outrosProdutos = Produtos.filter((produto) => produto.infos.produto != 'churrasqueira')
    setCatalogoCompleto(true)
}

    return(
        <><div className="catalogo flex flex-col w-full items-center justify-center">
            <p className="text-[2rem]">Catálogo</p>
            <div className="produtos-principais flex flex-row gap-20 bg-slate-700 w-full items-center justify-center">
                {principaisProdutos.map((produto) => (
                    <div key={produto.nome} className={`product ${produto.nome} bg-slate-100 color text-black flex-column rounded-[20px] w-fit`}>
                        <p>{produto.nome}</p>
                        <p>{produto.infos.breve_descricao}</p>
                        <Link className="bg-blue-800 text-white rounded-[10px]"
                        href={{pathname:'/orcamento', 
                        query: {
                            produto_nome: produto.nome,
                            produto: produto.infos.produto, 
                            tipo: produto.infos.tipo,
                            nome: produto.nome
                        }}}>Fazer orçamento</Link>
                    </div>                    
                ))}
                {catalogoCompleto && outrosProdutos.length > 0 && (<>
                    {outrosProdutos.map((produto)=>(<>
                        <div key={produto.nome} className={`product ${produto.nome} bg-slate-100 color text-black flex-column rounded-[20px] w-fit`}>
                        <p>{produto.nome}</p>
                        <p>{produto.infos.breve_descricao}</p>
                        <Link className="bg-blue-800 text-white rounded-[10px]"
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
                <button type="button" onClick={()=> {getTodosProdutos()}}>Ver todos os produtos</button>
            </>):(<>
                <button type="button" onClick={()=> {setCatalogoCompleto(false)}}>Ocultar</button>
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