import TypeOrcamento from "@/app/components/Type_orcamento";
import TypeDadosCliente from "@/app/components/Type_dadosCliente";
import { jsPDF } from "jspdf";

export default function GerarPdfOrcamento(dadosCliente: TypeDadosCliente | null,orcamento: TypeOrcamento, alturaParede: number){
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('imagem', 10, 10);  
    doc.text('Thaygle Pré-Moldados', 10, 20);
    doc.text(`Orçamento: ${orcamento.produto}`, 10, 30);

    // Dados do cliente
    doc.setFontSize(12);
    if (dadosCliente) {
        doc.setFont("helvetica", "bold");
        doc.text('Dados do cliente:', 10, 40);
        doc.setFont("helvetica", "normal");  

        doc.text(`Nome: ${dadosCliente.nome} ${dadosCliente.sobrenome}`, 10, 50);
        doc.text(`Contato: ${dadosCliente.telefone}`, 10, 60);
        doc.text(`CPF: ${dadosCliente.cpf}`, 10, 70);


        doc.setLineWidth(0.5);
        doc.line(10, 75, 200, 75); 
    }


    doc.setFontSize(12);
    doc.text(`Altura da Parede: ${alturaParede}m`, 10, 85);
    doc.text(`Quantidade de dutos/prolongadores: ${orcamento.dutos.qt}`, 10, 95);
    doc.text(`Valor total dos dutos/prolongadores: R$ ${orcamento.dutos.valor.toFixed(2)}`, 10, 105);

    if (orcamento.modulos.qt >= 1) {
        doc.text(`Quantidade de módulos: ${orcamento.modulos.qt}`, 10, 115);
        doc.text(`Valor total dos módulos: R$ ${orcamento.modulos.valor.toFixed(2)}`, 10, 125);
    }


    if (orcamento.desconto > 0) {
        doc.setFont("helvetica", "strike");  
        doc.text(`Valor sem desconto: R$ ${orcamento.soma.toFixed(2)}`, 10, 135);
        doc.setFont("helvetica", "normal");  
        doc.text(`Desconto: R$ ${orcamento.desconto.toFixed(2)}`, 10, 145);
        doc.text(`Valor total: R$ ${orcamento.total.toFixed(2)}`, 10, 155);
    } else {
        doc.text(`Valor total: R$ ${orcamento.total.toFixed(2)}`, 10, 135);
    }

    // Gera o PDF
    doc.save("orcamento_finalizado.pdf");

}