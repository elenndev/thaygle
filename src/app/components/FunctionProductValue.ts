import Produtos from "./Produtos";

const produtos = Produtos
export default function getValue(produto: string, tipo: string, qt:number): number{
    console.log('chegou aqui')
    const item = produtos.find((e) => e.infos.produto === produto && e.infos.tipo === tipo);

    if (item) {
        const result = item.infos.valor * qt;
        console.log(result);
        return result; 
    }

    return 0;
}