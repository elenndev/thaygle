import TypeOrcamento from "@/app/components/Type_orcamento";
import { jsPDF } from "jspdf";

export default function GerarPdfOrcamento(orcamento: TypeOrcamento, alturaParede: number){
    const doc = new jsPDF()
    doc.setFontSize(16);
    doc.text(`Orçamento: ${orcamento.produto}`, 10, 10);

    doc.setFontSize(12);
    doc.text(`Altura da Parede: ${alturaParede}m`, 10, 20);
    doc.text(`Valor sem desconto: R$ ${orcamento.soma.toFixed(2)}`, 10, 30);
    doc.text(`Desconto: R$ ${orcamento.desconto.toFixed(2)}`, 10, 40);
    doc.text(`Valor total: R$ ${orcamento.total.toFixed(2)}`, 10, 50);

    doc.save("orcamento_finalizado.pdf");
}