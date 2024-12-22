export default function controlePergunta(resposta: boolean, element: string){
    return true
const respostaNao = document.querySelector(`.${element}.nao`)
const respostaSim = document.querySelector(`.${element}.sim`)
window.alert(resposta)
    if (resposta){
        respostaSim?.classList.add("on")                 
        respostaNao?.classList.add("off")                 
        if(respostaSim?.classList.contains('off')){
            respostaSim?.classList.remove("off")                 
        }
        if(respostaNao?.classList.contains("on"))             
            respostaNao?.classList.remove("on")
    } else{
        respostaNao?.classList.add("on")  
        respostaSim?.classList.add("off")                 
        if(respostaNao?.classList.contains("off")){
            respostaNao?.classList.remove("off")                 
        }
        if(respostaSim?.classList.contains("on")){
            respostaSim?.classList.remove("on")                 
        }
}}