// import { StaticImageData } from "next/image";

type TypeProduto = {
    id: number;
    nome: string;
    infos: {
        produto: string;
        tipo: string;
        breve_descricao: string;
        descricao_completa: string;
        imagem: string;
        valor: number
    }}

export default TypeProduto