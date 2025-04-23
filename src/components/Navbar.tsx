'use client'
import { useState } from "react";
import Image from "next/image"


const Navbar:React.FC <{isHome: boolean}> = ({isHome}) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return(<header className='w-[100%] max-w-[97vw] flex justify-center items-center p-3 mt-2 fixed z-[5]'>
    <div className="relative w-full md:flex md:flex-row md:justify-between shadow-md z-[5] bg-[--devScheme-white] text-[--devScheme-gray] text-[1.5rem] uppercase">
        <Image className={`logo ml-1`} width={50} height={50} alt={`logo da empresa Thaygle Pre-moldados`} src="/logo.webp" />

    <nav className="md:flex md:flex-row md:justify-between z-[5] w-fit">
        <div className="flex absolute z-[7] top-1 right-5 items-center justify-between p-4 md:hidden lg:hidden">
        <button
            aria-label="Toggle Navigation"
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none">
        <span className="block w-8 h-1 bg-[--devScheme-gray] mb-1"></span>
        <span className="block w-8 h-1 bg-[--devScheme-gray] mb-1"></span>
        <span className="block w-8 h-1 bg-[--devScheme-gray]"></span>
        </button>
        </div>

        <div className={`md:flex md:items-center md:justify-between md:mr-[100px] font-gothic ${ isOpen ? "block" : "hidden"}`}>
            <ul className="py-[10px] px-[5px] bg-[--devScheme-white] shadow-md md:shadow-none flex absolute right-[3px] top-0 z-[6] flex-col md:relative md:flex-row md:gap-8 text-center pt-[70px] md:pt-[10px]">
                <li className="py-[5px] md:p-x-[5px] md:px-[5px]">
                    <a href={isHome? "#hero" : "/"}
                    onClick={()=> setIsOpen(false)}
                    className="font-medium tracking-widest md:bg-[--devScheme-white] md:shadow md:px-[10px] md:py-[5px] hover:text-[--devScheme-white] hover:bg-[--devScheme-softBlue]">
                        Inicio
                    </a>
                </li>
                {isHome && (<>
                    <li className="py-[5px] md:p-x-[5px] md:px-[5px]">
                        <a href="#catalogo"
                        onClick={()=> setIsOpen(false)}
                        className="font-medium tracking-widest md:bg-[--devScheme-white] md:shadow md:px-[10px] md:py-[5px] hover:text-[--devScheme-white] hover:bg-[--devScheme-softBlue]">
                            Produtos
                        </a>
                    </li>
                    <li className="py-[5px] md:p-x-[5px] md:px-[5px]">
                        <a href="#sobre"
                        onClick={()=> setIsOpen(false)}
                        className="font-medium tracking-widest md:bg-[--devScheme-white] md:shadow md:px-[10px] md:py-[5px] hover:text-[--devScheme-white] hover:bg-[--devScheme-softBlue]">
                            Sobre
                        </a>
                    </li>
                </>)}
                <li className="py-[5px] md:p-x-[5px] md:px-[5px]">
                    <a href="/Thaygle Pre-Moldados - Catalogo.pdf"
                    onClick={()=> setIsOpen(false)}
                    className="font-medium tracking-widest md:bg-[--devScheme-white] md:shadow md:px-[10px] md:py-[5px] hover:text-[--devScheme-white] hover:bg-[--devScheme-softBlue]" download>
                        Download Catálogo
                    </a>
                </li>
            </ul>
        </div>
    </nav>
    </div>
    </header>)
}

export default Navbar