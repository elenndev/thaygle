'use client'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import gsap from 'gsap';


const SectionSobre = () => {
    const sectionSobre = useRef<HTMLDivElement>(null)
    const titulo = useRef(null)
    const imagem = useRef(null)
    const textoSobre = useRef(null)
    const redesSociais = useRef(null)

    function entradaSection(){
        const animacaoTitulo = ()=>{gsap.context(()=>{
            gsap.fromTo(titulo.current,{
                x: 100,
                opacity: 0,
            },
            {x: 0,
            opacity: 1,
            duration: 1
            })
        }, titulo)}
        const animacaoImagem = () =>{gsap.context(()=>{
            gsap.fromTo(imagem.current,{
                x: -100,
                opacity: 0,
            },
            {x: 0,
            opacity: 1,
            duration: 1
            })
        }, imagem)}
        const animacaoTextoSobre = ()=>{gsap.context(()=>{
            gsap.fromTo(textoSobre.current,{
                x: 100,
                opacity: 0,
            },
            {x: 0,
            opacity: 1,
            duration: 1
            })
        }, textoSobre)}
        const animacaoRedesSociais = () =>{gsap.context(()=>{
            gsap.fromTo(redesSociais.current,{
                x: -100,
                opacity: 0,
            },
            {x: 0,
            opacity: 1,
            duration: 1
            })
        }, redesSociais)}

        animacaoTitulo()
        animacaoImagem()
        animacaoTextoSobre()
        animacaoRedesSociais()
    }
    function saidaSection(){
        const animacaoTitulo = () =>{gsap.context(()=>{
            gsap.fromTo(titulo.current,{
                x: 0,
                opacity: 1,
            },
            {x: -100,
            opacity: 0,
            duration: 1
            })
        }, titulo)}
        const animacaoImagem = () =>{gsap.context(()=>{
            gsap.fromTo(imagem.current,{
                x: 0,
                opacity: 1,
            },
            {x: 100,
            opacity: 0,
            duration: 1
            })
        }, imagem)}
        const animacaoTextoSobre = () =>{gsap.context(()=>{
            gsap.fromTo(textoSobre.current,{
                x: 0,
                opacity: 1,
            },
            {x: -100,
            opacity: 0,
            duration: 1
            })
        }, textoSobre)}
        const animacaoRedesSociais = () =>{gsap.context(()=>{
            gsap.fromTo(redesSociais.current,{
                x: 0,
                opacity: 1,
            },
            {x: 100,
            opacity: 0,
            duration: 1
            })
        }, redesSociais)}

        animacaoTitulo()
        animacaoImagem()
        animacaoTextoSobre()
        animacaoRedesSociais()
    }
    
    useEffect(()=>{
        const observer = new IntersectionObserver((observar)=> {
            observar.forEach((elementoVisivel)=>{
                if(elementoVisivel.isIntersecting){ entradaSection()
                } else { saidaSection() }
            })
        }, {threshold: 0.4})

        if(sectionSobre.current){
            observer.observe(sectionSobre.current)
        }

    },[])
    return(<>
        <section ref={sectionSobre} id="sobre" className="sobre relative flex overflow-x-hidden flex-col items-center justify-start gap-[15px] h-fit w-full bg-[--devScheme-orange] text-[--devScheme-white] md:text-[1.85rem] pb-[20px]">
            <h2 ref={titulo} className="text-[--devScheme-white] text-[2.5rem] md:text-[4rem] mb-[10px] font-gothic font-medium uppercase tracking-widest text-center">Sobre</h2>
            <div className="conteudo flex flex-col items-center justify-center lg:gap-x-[50px] lg:flex-row w-[95%]">
                <span ref={imagem} className="foto-empresa w-fit h-fit relative mb-[10px] ">
                    <Image className="foto-empresa relative z-[2] lg:h-[300px] lg:w-[auto]" loading="lazy" height={200} width={200} alt="Logo da Thaygle pré-moldados"  src="/sobre.webp" />
                </span>
                <div className="informacoes w-[95%] lg:w-[50%] flex  flex-col items-end">
                    <p ref={textoSobre} className="w-full">Loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren</p>
                    <div ref={redesSociais} className="links justify-center flex flex-col w-[95%] gap-[5px]">
                        <h3 className="w-full text-[1.5rem] md:text-[2rem] text-center font-medium">Redes sociais:</h3>
                        <span className="w-full justify-center flex flex-row gap-[2rem]">
                            <a href="#"  aria-label='Ir para o Instagram da Thaygle Pré Moldados' className="flex flex-row items-center gap-[5px]">
                            <svg width="40px" height="40px" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {/* svg by: Garuda Technology | collection: Colored Interface And Logo Icons */}
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                <rect x="2" y="2" width="28" height="28" rx="6" fill="url(#paint0_radial_87_7153)"></rect>
                                <rect x="2" y="2" width="28" height="28" rx="6" fill="url(#paint1_radial_87_7153)"></rect>
                                <rect x="2" y="2" width="28" height="28" rx="6" fill="url(#paint2_radial_87_7153)"></rect>
                                <path d="M23 10.5C23 11.3284 22.3284 12 21.5 12C20.6716 12 20 11.3284 20 10.5C20 9.67157 20.6716 9 21.5 9C22.3284 9 23 9.67157 23 10.5Z" fill="white"></path>
                                <path fillRule="evenodd" clipRule="evenodd" d="M16 21C18.7614 21 21 18.7614 21 16C21 13.2386 18.7614 11 16 11C13.2386 11 11 13.2386 11 16C11 18.7614 13.2386 21 16 21ZM16 19C17.6569 19 19 17.6569 19 16C19 14.3431 17.6569 13 16 13C14.3431 13 13 14.3431 13 16C13 17.6569 14.3431 19 16 19Z" fill="white"></path>
                                <path fillRule="evenodd" clipRule="evenodd" d="M6 15.6C6 12.2397 6 10.5595 6.65396 9.27606C7.2292 8.14708 8.14708 7.2292 9.27606 6.65396C10.5595 6 12.2397 6 15.6 6H16.4C19.7603 6 21.4405 6 22.7239 6.65396C23.8529 7.2292 24.7708 8.14708 25.346 9.27606C26 10.5595 26 12.2397 26 15.6V16.4C26 19.7603 26 21.4405 25.346 22.7239C24.7708 23.8529 23.8529 24.7708 22.7239 25.346C21.4405 26 19.7603 26 16.4 26H15.6C12.2397 26 10.5595 26 9.27606 25.346C8.14708 24.7708 7.2292 23.8529 6.65396 22.7239C6 21.4405 6 19.7603 6 16.4V15.6ZM15.6 8H16.4C18.1132 8 19.2777 8.00156 20.1779 8.0751C21.0548 8.14674 21.5032 8.27659 21.816 8.43597C22.5686 8.81947 23.1805 9.43139 23.564 10.184C23.7234 10.4968 23.8533 10.9452 23.9249 11.8221C23.9984 12.7223 24 13.8868 24 15.6V16.4C24 18.1132 23.9984 19.2777 23.9249 20.1779C23.8533 21.0548 23.7234 21.5032 23.564 21.816C23.1805 22.5686 22.5686 23.1805 21.816 23.564C21.5032 23.7234 21.0548 23.8533 20.1779 23.9249C19.2777 23.9984 18.1132 24 16.4 24H15.6C13.8868 24 12.7223 23.9984 11.8221 23.9249C10.9452 23.8533 10.4968 23.7234 10.184 23.564C9.43139 23.1805 8.81947 22.5686 8.43597 21.816C8.27659 21.5032 8.14674 21.0548 8.0751 20.1779C8.00156 19.2777 8 18.1132 8 16.4V15.6C8 13.8868 8.00156 12.7223 8.0751 11.8221C8.14674 10.9452 8.27659 10.4968 8.43597 10.184C8.81947 9.43139 9.43139 8.81947 10.184 8.43597C10.4968 8.27659 10.9452 8.14674 11.8221 8.0751C12.7223 8.00156 13.8868 8 15.6 8Z" fill="white"></path>
                                <defs>
                                    <radialGradient id="paint0_radial_87_7153" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(12 23) rotate(-55.3758) scale(25.5196)">
                                    <stop stopColor="#B13589"></stop>
                                    <stop offset="0.79309" stopColor="#C62F94"></stop>
                                    <stop offset="1" stopColor="#8A3AC8"></stop>
                                    </radialGradient>
                                    <radialGradient id="paint1_radial_87_7153" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(11 31) rotate(-65.1363) scale(22.5942)">
                                    <stop stopColor="#E0E8B7"></stop>
                                    <stop offset="0.444662" stopColor="#FB8A2E"></stop>
                                    <stop offset="0.71474" stopColor="#E2425C"></stop>
                                    <stop offset="1" stopColor="#E2425C" stopOpacity="0"></stop>
                                    </radialGradient>
                                    <radialGradient id="paint2_radial_87_7153" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(0.500002 3) rotate(-8.1301) scale(38.8909 8.31836)">
                                    <stop offset="0.156701" stopColor="#406ADC"></stop>
                                    <stop offset="0.467799" stopColor="#6A45BE"></stop>
                                    <stop offset="1" stopColor="#6A45BE" stopOpacity="0"></stop>
                                    </radialGradient>
                                </defs>
                                </g>
                            </svg>
                                Instagram
                            </a>
                            <a href="#" aria-label='Ir para o Facebook da Thaygle Pré Moldados' className="flex flex-row items-center gap-[5px]">
                                <svg width="40px" height="40px" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                {/* svg by: Garuda Technology | collection: Colored Interface And Logo Icons */}
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                    <circle cx="16" cy="16" r="14" fill="url(#paint0_linear_87_7208)"></circle>
                                    <path d="M21.2137 20.2816L21.8356 16.3301H17.9452V13.767C17.9452 12.6857 18.4877 11.6311 20.2302 11.6311H22V8.26699C22 8.26699 20.3945 8 18.8603 8C15.6548 8 13.5617 9.89294 13.5617 13.3184V16.3301H10V20.2816H13.5617V29.8345C14.2767 29.944 15.0082 30 15.7534 30C16.4986 30 17.2302 29.944 17.9452 29.8345V20.2816H21.2137Z" fill="white"></path>
                                    <defs>
                                        <linearGradient id="paint0_linear_87_7208" x1="16" y1="2" x2="16" y2="29.917" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#18ACFE"></stop>
                                        <stop offset="1" stopColor="#0163E0"></stop>
                                        </linearGradient>
                                    </defs>
                                    </g>
                                </svg>
                                Facebook
                            </a>
                        </span>
                    </div>
                </div>
            </div>
        </section>
    </>)
}

export default SectionSobre