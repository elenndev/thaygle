import Produtos from "@/utilities/Produtos"
import { RefObject } from "react"
import gsap from "gsap";


export function UseSectionCatalogo(){
    function obterCorVariacao(variacaoProduto: string){
        let cor = 'transparent'
        switch (variacaoProduto){
            case "Prestígio":
                cor = "--devScheme-prestigio"
                break
            case "Vermelho":
                cor = "--devScheme-vermelho"
                break
            case "Champanhe":
                cor = "--devScheme-champanhe"
                break
            case "Chocolate":
                cor = "--devScheme-chocolate"
                break
            case "Amadeirada":
                cor = "--devScheme-amadeirada"
                break
            default:
                cor = "--devScheme-gray"
                break
        }
        return cor

    }
    
    function controlarCard(action: string, elementId: string){
        const id = elementId.replace(" ", "_")
        const openCard = document.querySelector(`#${id}`)
        const allMiniCards = document.querySelectorAll('.smallCard-produto')
    
        if (action == 'open'){
            openCard?.classList.remove('hidden')
            openCard?.classList.add('flex')
            allMiniCards.forEach((e)=>{
                e.classList.remove('flex')
                e.classList.add('hidden')
            })
        } else {
            openCard?.classList.remove('flex')
            openCard?.classList.add('hidden')
            allMiniCards.forEach((e)=>{
                e.classList.remove('hidden')
                e.classList.add('flex')
            })
        }
    }

    function entradaCards(Lista: RefObject<HTMLDivElement | null>){
        if(!Lista){
            return
        }
        const cards = Lista.current?.querySelectorAll('.smallCard-produto')
        if(!cards){return}
        let delay = 0.0
        cards?.forEach(card => {
            delay = delay + 0.5
            gsap.context(()=> {
                gsap.fromTo(card, {
                    x: -100,
                    opacity: 0},
                    {x: 0,
                    opacity: 1,
                    delay: delay, 
                    duration: 1}
                )
            },card)
        })  
    }
    function saidaCards(Lista: RefObject<HTMLDivElement | null>){
        if(!Lista){
            return
        }
        const cards = Lista.current?.querySelectorAll('.smallCard-produto')
        if(!cards!){return}
        cards?.forEach(card => {
            gsap.context(()=>{
                gsap.fromTo(card,{
                    x:0,
                    opacity:1},
                    {x: 100,
                    opacity: 0,
                    duration: 0.5})
            },card)
        })        
    }

    const produtos = Produtos
    function ObterValorDoProduto(produto: string, tipo: string, qt:number): number{
        const item = produtos.find((e) => e.infos.produto === produto && e.infos.tipo === tipo);

        if (item) {
            const result = item.infos.valor * qt;
            return result; 
        }

        return 0;
    }

    return{
        obterCorVariacao,
        controlarCard,
        entradaCards,
        saidaCards,
        ObterValorDoProduto
    }
}