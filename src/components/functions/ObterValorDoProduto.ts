import Produtos from "../utilities/Produtos";

const produtos = Produtos
export default function ObterValorDoProduto(produto: string, tipo: string, qt:number): number{
    const item = produtos.find((e) => e.infos.produto === produto && e.infos.tipo === tipo);

    if (item) {
        const result = item.infos.valor * qt;
        return result; 
    }

    return 0;
}