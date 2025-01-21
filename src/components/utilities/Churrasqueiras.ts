import TypeChurrasqueira from "../types/Type_churrasqueira"

const imagemUrl = "/logo.webp"
// const url = process.env.NODE_ENV == 'development'? 'http://localhost:3000' : process.env.PRODUCTION_URL



const Churrasqueiras: TypeChurrasqueira[] = [
    {id: 1,
        nome: 'Churrasqueira Tijolinho',
        infos: {
            produto: 'churrasqueira',
            tipo: 'tijolinho',
            breve_descricao: 'Design rústico e alvenaria em alto relevo.',
            descricao_completa: 'Com um design único nossas churrasqueiras desenhadas simulam o formato de tijolinho de alvenaria em alto relevo que com seu estilo rústico combina com qualquer espaço. Trabalhamos com uma variedade de cores para você escolher a que melhor combina com o seu espaço.',
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
                    "Profundidade Interna   42cm",
                    "Profundidade Interna   47cm",
                    "Altura   200cm",
                ]
            }
        ],
            variacoes:[
                {id: 0,
                    nome_variacao: "Prestígio",
                    imagem_variacao: `/tijolinho-prestigio.png`},
                    {id: 1,
                    nome_variacao: "Vermelho",
                    imagem_variacao: `/tijolinho-vermelho.png`},
                    {id: 2,
                    nome_variacao: "Champanhe",
                    imagem_variacao: `/tijolinho-champanhe.png`},
                    {id: 3,
                    nome_variacao: "Chocolate",
                    imagem_variacao: `/tijolinho-chocolate.png`},
                    {id: 4,
                    nome_variacao: "Amadeirada",
                    imagem_variacao: `/tijolinho-amadeirada.png`},
            ]
        }
    },
    {id: 2,
        nome: 'Churrasqueira Tijolinho com Balcão',
        infos: {
            produto: 'churrasqueira',
            tipo: 'tijolinho balcao',
            breve_descricao: 'Design rústico e alvenaria em alto relevo e com bancada auxiliar.',
            descricao_completa: 'Além do design único que simula o formato de tijolinho de alvenaria em alto relevo e diversas opções de cores, atende a necessidade de um espaço sem a existência de bancadads, nossa churrasqueira com bancada auxiliar é o melhor custo benéfico, permitindo que você escolha a localização da bancada, seja no lado direito quanto esquerdo.',
            imagem: imagemUrl,
            valor: 1300},
        detalhes: {
            listas: [
                {nome_lista: "Bancada ideal para:",
                itens_lista: [
                    "Manipulação da carne | Apoio de utensílios para o churrasco | ",
                    "Combina em qualquer espaço",
                ]},
                {nome_lista: "4 Espetos | TM 65",
                itens_lista: [
                    "Largura Interna   55cm",
                    "Largura Externa   65cm",
                    "Profundidade Interna   42cm",
                    "Profundidade Inerna   47cm",
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
                imagem_variacao: `/tijolinho-balcao-prestigio.png`},
                {id: 1,
                nome_variacao: "Vermelho",
                imagem_variacao: `/tijolinho-balcao-vermelho.png`},
                {id: 2,
                nome_variacao: "Champanhe",
                imagem_variacao: `/tijolinho-balcao-champanhe.png`},
                {id: 3,
                nome_variacao: "Chocolate",
                imagem_variacao: `/tijolinho-balcao-chocolate.png`},
                {id: 4,
                nome_variacao: "Amadeirada",
                imagem_variacao: `/tijolinho-balcao-amadeirada.png`},
            ]
        }
    },
    {id: 3,
        nome: 'Churrasqueira Predial',
        infos: {
            produto: 'churrasqueira',
            tipo: 'predial',
            breve_descricao: 'Customizável, moderna e prática.',
            descricao_completa: 'Projetada para combinar com qualquer ambiente, nossa churrasqueira predial abre um leque de possibilidades para que sua imaginação flua e a customize como você sempre sonhou.',
            imagem: imagemUrl,
            valor: 800},
        detalhes: {
            listas: [
                {nome_lista: "4 Espetos | TM 65",
                itens_lista: [
                    "Largura Interna   55cm",
                    "Largura Externa   65cm",
                    "Profundidade Interna   42cm",
                    "Profundidade Interna   47cm",
                    "Altura   200cm",
                ]
                },
                {nome_lista: "Customize com:",
                itens_lista: [
                    "Porcelanatos | Cerâmicas | Pastilhas | Texturas | Pinturas"
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
                nome_variacao: "Natural",
                imagem_variacao: `/predial-natural.png`}
            ]
        }
    },
]

export default Churrasqueiras