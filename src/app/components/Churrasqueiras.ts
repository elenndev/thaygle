import TypeChurrasqueira from "./Type_churrasqueira";
const imagemUrl = "/logo.webp"


const Churrasqueiras: TypeChurrasqueira[] = [
    {id: 1,
        nome: 'Churrasqueira Tijolinho',
        infos: {
            produto: 'churrasqueira',
            tipo: 'tijolinho',
            breve_descricao: 'loren loren loren loren loren loren',
            descricao_completa: 'loren loren loren loren loren loren',
            imagem: imagemUrl,
            valor: 800},
        detalhes: {
            listas: [
            {
                nome_lista: "Detalhes Premium",
                itens_lista: [
                    "Cantos finos e alinhados",
                    "Tijolos Lisos e alinhados",
                    "Encaixe perfeito sem brechas",
                    "Placas internas reguláveis",
                ]
            },
            {
                nome_lista: "4 Espetos | TM 65",
                itens_lista: [
                    "Largura Interna   55cm",
                    "Largura Externa   65cm",
                    "Profundidade Interna?   42cm",
                    "Profundidade Interna?   47cm",
                    "Altura   200cm",
                ]
            }
        ],
            variacoes:[
                {id: 0,
                    nome_variacao: "Prestígio",
                    imagem_variacao: imagemUrl},
                    {id: 1,
                    nome_variacao: "Vermelho",
                    imagem_variacao: imagemUrl},
                    {id: 2,
                    nome_variacao: "Champanhe",
                    imagem_variacao: imagemUrl},
                    {id: 3,
                    nome_variacao: "Chocolate",
                    imagem_variacao: imagemUrl},
                    {id: 4,
                    nome_variacao: "Amadeirada",
                    imagem_variacao: imagemUrl},
            ]
        }
    },
    {id: 2,
        nome: 'Churrasqueira Tijolinho com Balcão',
        infos: {
            produto: 'churrasqueira',
            tipo: 'tijolinho balcao',
            breve_descricao: 'loren loren loren loren loren loren',
            descricao_completa: 'loren loren loren loren loren loren',
            imagem: imagemUrl,
            valor: 1300},
        detalhes: {
            listas: [
                {nome_lista: "Bancada ideal para:",
                itens_lista: [
                    "Manipulação da carne",
                    "Apoio de utensílios para o churrasco",
                    "Combina em qualquer espaço",
                ]},
                {nome_lista: "4 Espetos | TM 65",
                itens_lista: [
                    "Largura Interna   55cm",
                    "Largura Externa   65cm",
                    "Profundidade Interna?   42cm",
                    "Profundidade Inerna?.   47cm",
                    "Altura   200cm",
                ]},
                {nome_lista: "Bancada",
                itens_lista: [
                    "Largura Externa   65cm",
                    "Altura   92cm",
                    "Largura Total   130cm",
                ]
                },
            ],
            variacoes:[
                {id: 0,
                nome_variacao: "Prestígio",
                imagem_variacao: imagemUrl},
                {id: 1,
                nome_variacao: "Vermelho",
                imagem_variacao: imagemUrl},
                {id: 2,
                nome_variacao: "Champanhe",
                imagem_variacao: imagemUrl},
                {id: 3,
                nome_variacao: "Chocolate",
                imagem_variacao: imagemUrl},
                {id: 4,
                nome_variacao: "Amadeirada",
                imagem_variacao: imagemUrl},
            ]
        }
    },
    {id: 3,
        nome: 'Churrasqueira Predial',
        infos: {
            produto: 'churrasqueira',
            tipo: 'predial',
            breve_descricao: 'loren loren loren loren loren loren',
            descricao_completa: 'loren loren loren loren loren loren',
            imagem: imagemUrl,
            valor: 800},
        detalhes: {
            listas: [
                {nome_lista: "4 Espetos | TM 65",
                itens_lista: [
                    "Largura Interna   55cm",
                    "Largura Externa   65cm",
                    "Profundidade Interna?   42cm",
                    "Profundidade Inerna?.   47cm",
                    "Altura   200cm",
                ]
                },
                {nome_lista: "Customize com",
                itens_lista: [
                    "Porcelanatos",
                    "Cerâmicas",
                    "Pastilhas",
                    "Texturas",
                    "Pinturas",
                ]
                },
                {nome_lista: "Bancada ideal para:",
                itens_lista: [
                    "Manipulação da carne",
                    "Apoio de utensílios para o churrasco",
                    "Combina em qualquer espaço",
                ]
            }],
            variacoes:[
                {id: 0,
                nome_variacao: "Padrão",
                imagem_variacao: imagemUrl},
            ]
        }
    },
]

export default Churrasqueiras