type listaDetalhes = {
    nome_lista: string;
    itens_lista: string[];
}
type TypeChurrasqueira = {
    id: number;
    nome: string;
    infos: {
        produto: string;
        tipo: string;
        breve_descricao: string;
        descricao_completa: string;
        imagem: string;
        valor: number
    };
    detalhes: {
        listas: listaDetalhes[] | null;
        variacoes: string[];
    };
}

export default TypeChurrasqueira