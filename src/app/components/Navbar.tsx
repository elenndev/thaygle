'use client'
import { useState } from "react";

const HomeNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    return(<>
    <nav className="fixed z-5 w-[100%] top-[0] bg-[--devScheme-white] text-[--devScheme-gray]">
        <div className="flex items-center justify-between p-4 lg:hidden">
        <h1 className="text-xl font-bold">Logo</h1>
        <button
            aria-label="Toggle Navigation"
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none">
        <span className="block w-8 h-1 bg-[--devScheme-gray] mb-1"></span>
        <span className="block w-8 h-1 bg-[--devScheme-gray] mb-1"></span>
        <span className="block w-8 h-1 bg-[--devScheme-gray]"></span>
        </button>
        </div>

        <div className={`lg:flex lg:items-center lg:justify-between ${ isOpen ? "block" : "hidden"}`}>
            <ul className="bg-[--devScheme-white] shadow flex absolute right-[0] flex-col lg:flex-row lg:gap-8 text-center">
                <li className=" p-4 hover:bg-blue-700 lg:p-0">
                    <a href="#home" className="text-[--devScheme-gray] font-bold">Contato</a>
                </li>
                <li className="p-4 hover:bg-blue-700 lg:p-0">
                    <a href="#produtos" className="text-[--devScheme-gray] font-bold">Produtos</a>
                </li>
                <li className="p-4 hover:bg-blue-700 lg:p-0">
                    <a href="#sobre" className="text-[--devScheme-gray] font-bold">Sobre</a>
                </li>
            </ul>
        </div>
    </nav>
    </>)
}

export default HomeNavbar