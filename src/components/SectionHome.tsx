'use client'
import Image from 'next/image'
import { useEffect, useRef } from 'react';
import gsap from 'gsap'
import { FaMapMarkedAlt } from "react-icons/fa";

const SectionHome = () => {
    const logoImageStyle = {
        'zIndex': '2',
        'Position': 'absolute',}

    const sectionHome = useRef(null)
    const linkLocalizacao = useRef(null)
    const textoPrincipal = useRef(null)

    //animacoes
    function animacaoLinkLocalizacao(isAnimacaoDeEntrada: boolean){
        const origemX = isAnimacaoDeEntrada? 100 : 0
        const destinoX = isAnimacaoDeEntrada? 0 : 100
        const origemOpacity = isAnimacaoDeEntrada? 0 : 1
        const destinoOpacity = isAnimacaoDeEntrada? 1 : 0
        if(!linkLocalizacao.current){return}
        gsap.context(()=>{
            gsap.fromTo(linkLocalizacao.current, {
                x: origemX,
                opacity: origemOpacity
            },{
                x: destinoX,
                opacity: destinoOpacity,
                duration: 0.5,
                delay: 0.025,
                ease: "ease"
            })
        }, linkLocalizacao)
    }
    function animacaoTextoPrincipal(isAnimacaoDeEntrada: boolean){
        const origemX = isAnimacaoDeEntrada? -100 : 0
        const destinoX = isAnimacaoDeEntrada? 0 : -100
        const origemOpacity = isAnimacaoDeEntrada? 0 : 1
        const destinoOpacity = isAnimacaoDeEntrada? 1 : 0
        if(!textoPrincipal){return}
        gsap.context(()=>{
            gsap.fromTo(textoPrincipal.current, {
                x: origemX,
                opacity: origemOpacity
            },{
                x: destinoX,
                opacity: destinoOpacity,
                duration: 0.5,
                delay: 0.25,
                ease: "ease"
            })
        }, textoPrincipal)
    }

    useEffect(()=> {
        const observer = new IntersectionObserver((observar)=> {
            observar.forEach((elementoVisivel)=>{
                if(elementoVisivel.isIntersecting){
                    animacaoLinkLocalizacao(true)
                    animacaoTextoPrincipal(true)
                } else{
                    animacaoLinkLocalizacao(false)
                    animacaoTextoPrincipal(false)
                }
            })
        })
        if(sectionHome.current){
            observer.observe(sectionHome.current)
        }
    },[])

    return(<>
        <section ref={sectionHome} id="hero" className="home relative flex overflow-y-hidden overflow-x-hidden flex-col items-center justify-center max-h-screen h-full w-full">
        <Image style={logoImageStyle} loading="lazy" height={200} width={200} alt="Logo da Thaygle pré-moldados"  className="absolute top-[12vh] left-[2vw] md:left-[1%] md:top-[30%] lg:top-[25%] lg:left-[8%]" src="/logo.webp" />
        <h1 ref={textoPrincipal}
        className="text-[--devScheme-orange] 
        mt-[26%] md:mt-[0] md:ml-[20%] text-[3.25rem] md:text-[5.5rem] 
        lg:ml-[28%] lg:text-[6rem] font-gothic font-normal uppercase tracking-wider text-center cursor-default">
            Churrasqueiras<br></br>pré-moldadas
        </h1>
        <a ref={linkLocalizacao} 
        className="localizacao 
        md:ml-[20%] lg:ml-[28%] mb-[0%] py-[5px] px-[20px] rounded-[5px]
        w-fit flex flex-row gap-x-[10px] items-center
        bg-[--devScheme-white]
        cursor-pointer 
        font-gothic text-[--devScheme-gray] text-[1.25rem] lg:text-[2rem] tracking-wider 
        underline decoration-[--devScheme-gray]" href="https://www.google.com/maps?q=Itumbiara,+Goi%C3%A1s" target="_blank">
            
        <FaMapMarkedAlt style={{fill: 'var(--devScheme-gray)'}}/>
        Em Itumbiara - GO</a>
        </section>
    </>)
}

export default SectionHome