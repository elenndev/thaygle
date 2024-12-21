export default function controlePergunta(resposta: boolean, element: string){
const respostaNao = document.querySelector(`.${element}.nao`)
const respostaSim = document.querySelector(`.${element}.sim`)
    if (resposta){
        respostaSim?.classList.remove("off")                 
        respostaSim?.classList.add("on")                 
        respostaNao?.classList.remove("on")                 
        respostaNao?.classList.add("off")                 
    } else{
        respostaNao?.classList.remove("off")                 
        respostaNao?.classList.add("on")  
        respostaSim?.classList.remove("on")                 
        respostaSim?.classList.add("off")                 
}}