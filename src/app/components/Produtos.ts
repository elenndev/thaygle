import TypeProduto from "./Type_produto"
// import imagemUrl from "../midia/logo.webp"
const imagemUrl = "/logo.webp"

const Produtos: TypeProduto[] = [
    {id: 1,
    nome: 'Churrasqueira Tijolinho',
        infos: {
            produto: 'churrasqueira',
            tipo: 'tijolinho',
            breve_descricao: 'loren loren loren loren loren loren',
            descricao_completa: 'loren loren loren loren loren loren',
            imagem: imagemUrl,
            valor: 800}},
    {id: 2,
    nome: 'Churrasqueira Tijolinho com Balcão',
        infos: {
            produto: 'churrasqueira',
            tipo: 'tijolinho balcao',
            breve_descricao: 'loren loren loren loren loren loren',
            descricao_completa: 'loren loren loren loren loren loren',
            imagem: imagemUrl,
            valor: 1300}},
    {id: 3,
    nome: 'Churrasqueira Predial',
        infos: {
            produto: 'churrasqueira',
            tipo: 'predial',
            breve_descricao: 'loren loren loren loren loren loren',
            descricao_completa: 'loren loren loren loren loren loren',
            imagem: imagemUrl,
            valor: 800}},
    {id: 4,
    nome: 'Duto/Prolongador Tijolinho',
        infos: {
            produto: 'duto',
            tipo: 'tijolinho',
            breve_descricao: 'loren loren loren loren loren loren',
            descricao_completa: 'loren loren loren loren loren loren',
            imagem: "no image",
            valor: 50}},
    {id: 5,
    nome: 'Duto/Prolongador Liso',
        infos: {
            produto: 'duto',
            tipo: 'liso',
            breve_descricao: 'loren loren loren loren loren loren',
            descricao_completa: 'loren loren loren loren loren loren',
            imagem: "no image",
            valor: 40}},
    {id: 6,
    nome: 'Castelo Liso',
        infos: {
            produto: 'castelo',
            tipo: 'liso',
            breve_descricao: 'loren loren loren loren loren loren',
            descricao_completa: 'loren loren loren loren loren loren',
            imagem: "no image",
            valor: 40}},
    {id: 7,
    nome: 'Castelo Tijolinho',
        infos: {
            produto: 'castelo',
            tipo: 'tijolinho',
            breve_descricao: 'loren loren loren loren loren loren',
            descricao_completa: 'loren loren loren loren loren loren',
            imagem: "no image",
            valor: 50}},
    {id: 8,
    nome: 'Módulo Predial',
        infos: {
            produto: 'modulo',
            tipo: 'predial',
            breve_descricao: 'loren loren loren loren loren loren',
            descricao_completa: 'loren loren loren loren loren loren',
            imagem: "no image",
            valor: 90}},
    {id: 9,
    nome: 'Placas Refratárias',
        infos: {
            produto: 'placas',
            tipo: 'predial',
            breve_descricao: 'Conjunto com 6 peças',
            descricao_completa: '2 laterais grandes | 2 laterais pequenas | 1 placa em U | 1 ralo',
            imagem: "no image",
            valor: 150}},
    {id: 10,
    nome: 'Chapéu',
        infos: {
            produto: 'chapeu',
            tipo: 'default',
            breve_descricao: 'loren loren loren loren loren loren',
            descricao_completa: 'loren loren loren loren loren loren',
            imagem: "no image",
            valor: 25}},
    
]

export default Produtos