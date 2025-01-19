export default function controlarCard(action: string, elementId: string){
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