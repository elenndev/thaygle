'use client'
import { useEffect, useRef} from "react"
import { UseSectionCatalogo } from "./use-SectionCatalogo";

import { ListaProdutos } from "./ListaProdutos";

const SectionCatalogo = () =>{
    const {entradaCards, saidaCards} = UseSectionCatalogo()

    const sectionCatalogo = useRef<HTMLDivElement | null>(null)

    const Lista = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (typeof window !== "undefined") {
            const observer = new IntersectionObserver((observar) => {
                observar.forEach((elementoVisivel) => {
                    if (sectionCatalogo.current) {
                        if (elementoVisivel.isIntersecting) {
                            entradaCards(Lista);
                        } else {
                            saidaCards(Lista);
                        }
                    }
                });
            }, { threshold: 0.4 });

            if (sectionCatalogo.current) {
                observer.observe(sectionCatalogo.current);
            }

            // return () => {
            //     if (sectionCatalogo.current) {
            //         observer.unobserve(sectionCatalogo);
            //     }
            // };
        }
    });
    
    return(
        <section ref={sectionCatalogo} id="catalogo" className="produtos relative bg-[--devScheme-white] flex min-h-[fit-content] h-screen w-screen items-center justify-center flex-col flex-wrap">
            <h2 className="text-[--devScheme-gray] tracking-widest md:tracking-wide text-[2.5rem] md:text-[4rem] mb-[10px] font-gothic font-medium">
                Catálogo
            </h2>
            <div ref={Lista} className="produtos-principais w-full h-max">
                <ListaProdutos />
            </div>
            <a className="bg-[--devScheme-softBlue] text-[1.25rem] md:text-[1.70rem] lg:text-[2rem] px-[10px] lg:px-[15px] py-[2px] my-[10px] text-white rounded-[2rem]" href="/Thaygle Pre-Moldados - Catalogo.pdf" download>
                Baixar catálogo
            </a>
        </section>
    )
}

export default SectionCatalogo