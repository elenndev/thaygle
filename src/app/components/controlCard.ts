export default function controlCard(action: string, elementId: string){
    const openCard = document.querySelector(`#${elementId}`)
    const allMiniCards = document.querySelectorAll('.smallCard-produto')
    console.log(openCard)

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