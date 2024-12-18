type TypeProduto = {
    id: number;
    nome: string;
    infos: {
        produto: string;
        tipo: string;
        breve_descricao: string;
        descricao_completa: string;
        valor: number
    }}

export default TypeProduto