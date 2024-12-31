'use client'
import Link from "next/link"
import './style.css'
import Image from "next/image"
import controlCard from "./controlCard"
import Churrasqueiras from "./Churrasqueiras"
import TypeChurrasqueira from "./Type_churrasqueira"
import { useEffect, useRef, useState } from "react"
import gsap from 'gsap';





const SectionCatalogo = () =>{
    const sectionCatalogo = useRef<HTMLDivElement>(null)
    const miniCardsProduto = useRef(null)
    //animacoes
    function entradaCards(){
        const cards = sectionCatalogo.current?.querySelectorAll('.smallCard-produto')
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
    function saidaCards(){
        const cards = sectionCatalogo.current?.querySelectorAll('.smallCard-produto')
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
    

    useEffect(()=>{
        const observer = new IntersectionObserver((observar)=> {
            observar.forEach((elementoVisivel)=>{
                if(elementoVisivel.isIntersecting){ entradaCards()
                } else { saidaCards() }
            })
        }, {threshold: 0.4})

            if(sectionCatalogo.current){
                observer.observe(sectionCatalogo.current)
            }
    },[])

    // elementos html   
    const CardProduto: React.FC<{produto: TypeChurrasqueira}> = ({produto}) =>{
        type TypeVariacoes = {
            id: number;
            nome_variacao: string;
            imagem_variacao: string;
        }
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
                case "Padrão":
                    cor = "--devScheme-gray"
                    break
            }
            return cor
    
        }
        
        //animacoes
        const bigCard = useRef(null)
            function abrirCard(){
                gsap.context(()=>{
                    gsap.fromTo(bigCard.current,{
                        y: 100,
                        opacity: 0,
                    },
                    {y: 0,
                    opacity: 1,
                    duration: 0.5
                    })
                }, bigCard)
            }
            
    
        function handleAbrirCard(){
            controlCard('open',`bigCard_${produto.infos.produto}_${produto.infos.tipo}`)
            abrirCard()
        }

        // elementos html
        const ListaVariacoes: React.FC <{variacoes: TypeVariacoes[]}> = ({variacoes}) => {
            const listaFormatada = variacoes.map(variacao => ({
                ...variacao,
                cssBackground: obterCorVariacao(variacao.nome_variacao),
                cssColor: variacao.nome_variacao == "Champanhe"? "--devScheme-gray" : "--devScheme-white"
            }))
            return(<span className="lista-variacoes flex flex-row items-center justify-start md:gap-x-[10px] lg:gap-x-[5px] gap-[3px] mb-[5px] flex-wrap w-[90%]">
                {listaFormatada.map((variacao, index) => (
                    <p style={{background: `var(${variacao.cssBackground})`}} className={`px-[5px] rounded-[20px] text-[${variacao.cssColor}] text-[0.90rem] md:text-[1rem]`} key={index}>{variacao.nome_variacao}</p>
                ))}
            </span>)
        }
    
        const CardProdutoAberto: React.FC<{produto: TypeChurrasqueira}> = ({produto}) => {
            type listaVariacao = {
                id: number;
                nome_variacao: string;
                imagem_variacao: string;
            }
            const variacoes = produto.detalhes.variacoes
            const [imagemEsquerda, setImagemEsquerda] = useState<listaVariacao>(variacoes[0])
            const [imagemCentro, setImagemCentro] = useState<listaVariacao>(variacoes[1])
            const [imagemDireita, setImagemDireita] = useState<listaVariacao>(variacoes[3])
            const [paragrafo_nomeVariacao, setParagrafo] = useState({background: "transparent", color: "--devScheme-gray"})
            useEffect(()=>{
                if (variacoes.length >= 3){
                    mudarCor(variacoes[1].nome_variacao)
                }
            },[])
            
            
            // ANIMACOES
            const containerEsquerdo = useRef(null)
            const containerCentro = useRef(null)
            const containerDireito = useRef(null)
            const nomeVariacaoFocada = useRef(null)
            const durationAnimation = 0.5
            const fromX_proxima = -100
            const fromX_anterior = 100
            const toX_proxima = 100
            const toX_anterior = -100

            function mudarCor(variacaoProduto: string){
                const cor = obterCorVariacao(variacaoProduto)
                setParagrafo({background: cor, color: variacaoProduto == "Champanhe"? "--devScheme-gray" : "--devScheme-white"})
                gsap.context(()=> {
                    const colorValue = `var(${cor})`
                    gsap.to(nomeVariacaoFocada.current, {
                        background: colorValue,
                        duration: 3.0,
                        ease: "sine.in"
                    })
                }, nomeVariacaoFocada)
                
            }
            function movEsquerda(isProxima: boolean){
                gsap.context(() => {
                    gsap.to(containerEsquerdo.current, {
                        x: isProxima? toX_proxima : toX_anterior,
                        delay: isProxima? 0.28 : 0.05,
                        duration: durationAnimation,
                        ease: "sine.in",
                        onComplete: (() => {
                            gsap.context(() => {
                                gsap.fromTo(containerEsquerdo.current, {
                                    x: isProxima? fromX_proxima : fromX_anterior,
                                },
                                {
                                    x: 0,
                                    duration: durationAnimation,
                                    ease: "circ",
                                });
                            }, containerEsquerdo);   
                        })
                    });
                }, containerEsquerdo);             
            }        
            function movCentro(isProxima: boolean, variacao: listaVariacao){
                gsap.context(()=> {
                    gsap.to(containerCentro.current, {
                        x: isProxima? toX_proxima : toX_anterior,
                        delay: 0.25,
                        duration: durationAnimation,
                        ease: "sine.in",
                        onComplete: (()=>{
                            gsap.fromTo(containerCentro.current, {
                                x: isProxima? fromX_proxima : fromX_anterior
                            },{
                                x: 0,
                                duration: durationAnimation,
                                ease: "circ"
                            })
                        })
                    })
                }, containerCentro)
                mudarCor(variacao.nome_variacao)
            }
            function movDireita(isProxima: boolean){
                gsap.context(()=> {
                    gsap.to(containerDireito.current, {
                        x: isProxima? toX_proxima : toX_anterior,
                        delay: isProxima? 0.05 : 0.28,
                        duration: durationAnimation,
                        ease: "sine.in",
                        onComplete: (()=>{
                            gsap.fromTo(containerDireito.current, {
                                x: isProxima? fromX_proxima : fromX_anterior,
                            },{
                                x: 0,
                                duration: durationAnimation,
                                ease: "circ"
                            })
                        })
                    })
                }, containerCentro)
            }
            
            
            function handleFecharCard(){
                controlCard('close', `bigCard_${produto.infos.produto}_${produto.infos.tipo}`)
            }
            function controleGaleria(acao: string,imagemAtual: listaVariacao){
                
                if (acao == "proxima"){
                    movEsquerda(false)
                    movCentro(false, imagemAtual)
                    movDireita(false)
    
                    const imagemEsquerdaAtual = imagemAtual
                    const imagemCentroAtual = imagemCentro
                    if(imagemEsquerdaAtual.nome_variacao == "Champanhe"){
                        setParagrafo({background: paragrafo_nomeVariacao.background, color: "--devScheme-gray"})
                    }
                    
                    if(imagemEsquerdaAtual.id == 0){
                        setImagemEsquerda(variacoes[(variacoes.length - 1)])
                    } else{
                        setImagemEsquerda(variacoes[(imagemEsquerdaAtual.id - 1)])
                    }
                    setImagemDireita(imagemCentroAtual)
                    setImagemCentro(imagemEsquerdaAtual)
                } else if (acao == "anterior"){
                    movDireita(true)
                    movCentro(true, imagemAtual)
                    movEsquerda(true)
                    
                    const imagemDireitaAtual = imagemAtual
                    const imagemCentroAtual = imagemCentro
                    if(imagemDireitaAtual.nome_variacao == "Champanhe"){
                        setParagrafo({background: paragrafo_nomeVariacao.background, color: "--devScheme-gray"})
                    }
                    
                    if(imagemDireitaAtual.id == variacoes.length - 1){
                        setImagemDireita(variacoes[0])
                    }else{
                        setImagemDireita(variacoes[(imagemDireitaAtual.id + 1)])
                    }
                    setImagemCentro(imagemDireitaAtual)
                    setImagemEsquerda(imagemCentroAtual)
                }
            }
            return(<>
                <div ref={bigCard} id={`bigCard_${produto.infos.produto.replace(" ","_")}_${produto.infos.tipo.replace(" ","_")}`} className={`hidden z-[2] bigCard bigCard-produto bg-[--devScheme-white] min-h-[90vh] w-[90vw] flex-col items-center justify-between gap-y-[10px] py-[10px] text-[--devScheme-gray] border-solid border-[--devScheme-orange] border-2 text-[1.25rem] md:text-[1.85rem]`}>
                    <button type="button" className="bg-[--devScheme-softBlue] text-[--devScheme-white] font-bold rounded-[2rem] py-[3px] px-[15px]" onClick={handleFecharCard}>Voltar pro catálogo</button>
                    <span className={`galeria items-center justify-center ${variacoes.length >= 3 ? "grid grid-cols-3 grid-rows-1" : "flex flex-row"}`}>
                        {variacoes.length >= 3 ? (<>
                            <span className="imagem-esquerda relative cursor-pointer flex items-center justify-center flex-col w-full overflow-hidden" onClick={() => controleGaleria("anterior",imagemEsquerda)}>
                                <Image ref={containerEsquerdo} width={100} height={100} className="esquerdo" alt={`Imagem da variação do produto`} src={imagemEsquerda.imagem_variacao}/>
                            </span>
                            <span className="imagem-centro overflow-hidden flex items-center justify-center flex-col w-full gap-y-[10px]">
                                <Image ref={containerCentro} width={400} height={400} className={`centro lg:w-[auto] lg:h-[300px]`} alt={`Imagem da variação do produto`} src={imagemCentro.imagem_variacao}/>
                                <p className={`centro text-center md:text-[1.50rem] px-[10px] rounded-[20px] text-[${paragrafo_nomeVariacao.color}] bg-[${paragrafo_nomeVariacao.background == '--devScheme-champanhe'? "gray" : "white"}]`} ref={nomeVariacaoFocada}>{imagemCentro.nome_variacao}</p>
                            </span>
                            <span className="imagem-direita relative cursor-pointer overflow-hidden flex items-center justify-center flex-col w-full gap-y-[10px]" onClick={()=> controleGaleria("proxima", imagemDireita)}>
                                <Image ref={containerDireito} width={100} height={100} className={`direito`} alt={`Imagem da variação do produto`} src={imagemDireita.imagem_variacao}/>
                            </span>
                        </>): (<>
                        <span className="imagem-unica overflow-hidden flex items-center justify-center flex-col w-full gap-y-[10px]">
                            <Image width={300} height={300} className={`centro`} alt={`Imagem da variação do produto`} src={imagemEsquerda.imagem_variacao}/>
                            <p className="centro text-center md:text-[1.50rem] px-[10px] rounded-[20px] bg-[--devScheme-gray] text-[--devScheme-white]">Padrão</p>
                        </span>
                        </>)}
                    </span>
                    <p className="font-bold nome-produto justify-center text-[1.5rem] md:text-[1.85rem] flex w-[90%]">{produto.nome}</p>
                    <p className="flex w-[90%]">{produto.infos.descricao_completa}</p>
                    {produto.detalhes.listas?.map((detalhe, index) => (
                        <ul key={index} className={`${detalhe.nome_lista} w-[90%]`}>
                            <p className="font-bold">{detalhe.nome_lista}</p>
                            {detalhe.itens_lista?.map((detalhe_item,index)=> (
                                <li key={index} className="detalhe">{detalhe_item}</li>)
                            )}
                        </ul>
                    ))}
                    <Link key={produto.id + 10} className="fazer-orcamento bg-[--devScheme-orange] px-[20px] py-[5px] text-white text-center rounded-[10px]"
                        href={{pathname:`/orcamento/${produto.nome.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-")}`, 
                        query: {
                            id: produto.id,
                        }}}>Fazer orçamento</Link>
                </div>
            </>)
        }
    
        return(<>
            <CardProdutoAberto produto={produto}/>
            <div ref={miniCardsProduto} id={`smallCard_${produto.infos.produto.replace(" ","_")}_${produto.infos.tipo.replace(" ","_")}`} className={`smallCard-produto ${produto.nome} relative w-[95%] lg:w-[30%] flex flex-row lg:flex-col lg:h-full items-center justify-between `}>
                <Image width={170} height={170} alt={`Imagem do produto ${produto.nome}`} src="/logo.webp"
                className="md:w-[200px] md:h-[auto]"/>
                <div className="produtos-info pl-[10px] flex flex-col w-[100%] text-[--devScheme-gray] sm:text-[1.5rem] md:text-[1.5rem]">
                    <p className="font-bold md:text-[2rem] md:font-medium nome-produto">{produto.nome}</p>
                    <p>Variações</p>
                    <ListaVariacoes variacoes={produto.detalhes.variacoes} />
                    <button type="button" onClick={() => handleAbrirCard()} className="ver-produto mt-[5px] bg-[--devScheme-orange] px-[10px] py-[2px] text-white rounded-[10px] md:text-[1.70rem]">Ver produto</button>
                </div>
    
    
            </div> 
    </>)
    } 
    const ListaProdutos = () =>{
        const principaisProdutos = Churrasqueiras
    
        const Principais = () => {
            return(<>
                <div className="produtos-principais flex flex-col lg:w-[95%] lg:flex-row gap-y-[20px] gap-x-[10px] w-fit items-center justify-center">
                    {principaisProdutos.map((produto) => (
                        <CardProduto key={produto.id} produto={produto}/>                    
                    ))}
                </div>
            </>)
        }
    
        return(
            <><div className="catalogo bg-[--devScheme-white] lg:w-sreen min-h-[fit] flex flex-col w-full items-center flex-wrap justify-center gap-y-[30px]">
                <Principais />
                <a className="bg-[--devScheme-softBlue] text-[1.25rem] md:text-[1.70rem] lg:text-[2rem] px-[10px] lg:px-[15px] py-[2px] mb-[10px] text-white rounded-[2rem]" href="/Thaygle Pre-Moldados - Catalogo.pdf" download>Baixar catálogo</a>
            </div>
            </>
        )
    }
    return(
        <section ref={sectionCatalogo} id="catalogo" className="produtos relative bg-[--devScheme-white] flex min-h-[fit-content] h-screen w-screen items-center justify-center flex-col flex-wrap">
            <h2 className="text-[--devScheme-gray] tracking-widest md:tracking-wide text-[2.5rem] md:text-[4rem] mb-[10px] font-gothic font-medium">Catálogo</h2>
            <ListaProdutos />
        </section>
    )
}

export default SectionCatalogo