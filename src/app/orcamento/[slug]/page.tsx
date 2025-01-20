import { Suspense } from "react";
import PageFazerOrcamento from "./PageFazerOrcamento";
import Churrasqueiras from "@/app/_components/utilities/Churrasqueiras";
import TypeChurrasqueira from "@/app/_components/types/Type_churrasqueira";

export const metadata = {
    title: 'Thaygle | Orçamento',
    description: 'Orçamento de churrasqueira pré-moldada - Itumbiara GO'
}


export async function generateStaticParams(){
    const churrasqueiras: TypeChurrasqueira[] = Churrasqueiras
    return churrasqueiras.map((churrasqueira: TypeChurrasqueira) => ({
        slug: churrasqueira.nome.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-")
    }))
}

export default function OrcamentoPage() {
    return (
        <Suspense fallback={<div>
            <p>Orçamento Churrasqueira Pré Moldada</p>
        </div>}>
            <PageFazerOrcamento />
        </Suspense>
    );
}