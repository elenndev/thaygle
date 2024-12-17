import Link from "next/link"
import Produtos from "./Produtos"


function PrincipaisProdutos(){
const produtos = Produtos
    return(
        <>
        <div className="flex-row gap-20 bg-slate-700 w-full items-center justify-center">
            {produtos.map((produto) => (
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