import { Suspense } from "react";
import Orcamento from "./Orcamento";
import Churrasqueiras from "@/app/components/Churrasqueiras";
import TypeChurrasqueira from "@/app/components/Type_churrasqueira";

export const metadata = {
    title: 'Thaygle | Orçamento',
    description: 'Orçamento de churrasqueira pré-moldada - Itumbiara GO'
}

// type PageProps = {
//     params: {slug: string;}
// }

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
            <Orcamento />
        </Suspense>
    );
}