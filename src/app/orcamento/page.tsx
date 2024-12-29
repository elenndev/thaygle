import { Suspense } from "react";
import Orcamento from "./Orcamento";

export const metadata = {
    title: 'Thaygle | Orçamento',
    description: 'Orçamento de churrasqueira pré-moldada - Itumbiara GO'
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