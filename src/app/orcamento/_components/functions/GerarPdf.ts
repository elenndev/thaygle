import TypeOrcamento from "@/app/_components/types/Type_orcamento";
import TypeDadosCliente from "@/app/_components/types/Type_dadosCliente";
import { jsPDF } from "jspdf";
import enviarOrcamentoWhatsapp from "./EnviarMensagem";

export default function GerarPdfOrcamento(dadosCliente: TypeDadosCliente | null,orcamento: TypeOrcamento, alturaParede: number, produtoVariacao: string | undefined, enviarMensagem: boolean){
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.addImage("/logo_png.png", "PNG", 10, 2, 25, 25);
    doc.text('Thaygle Pré-Moldados', 50, 10);
    doc.setFontSize(17);
    doc.text(`Orçamento: ${orcamento.produto} ${produtoVariacao != undefined ? `| ${produtoVariacao}` : ''}`, 10, 30);


    doc.setFontSize(14);
    if (dadosCliente) {
        doc.setFont("helvetica", "bold");
            doc.text('Dados do cliente:', 10, 40);
            doc.setFont("helvetica", "normal");  
            
        doc.text(`Nome: ${dadosCliente.nome}`, 10, 50);
        doc.text(`Contato: ${dadosCliente.telefone} | Endereço: ${dadosCliente.endereco}`, 10, 60);
        doc.text(`CPF: ${dadosCliente.cpf}`, 10, 70);


        doc.setLineWidth(0.5);
        doc.line(10, 75, 200, 75); 
    }
    
    doc.setFont("helvetica", "bold");
    doc.text(`Valores e informações`, 10, 85);
    doc.setFont("helvetica", "normal");
    doc.text(`Altura da Parede: ${alturaParede}m`, 10, 95);
    doc.text(`Quantidade de dutos/prolongadores: ${orcamento.dutos.qt}`, 10, 105);
    doc.text(`Valor total dos dutos/prolongadores: R$ ${orcamento.dutos.valor.toFixed(2)}`, 10, 115);

    if (orcamento.modulos.qt >= 1) {
        doc.text(`Quantidade de módulos: ${orcamento.modulos.qt}`, 10, 125);
        doc.text(`Valor total dos módulos: R$ ${orcamento.modulos.valor.toFixed(2)}`, 10, 135);
        if (orcamento.desconto > 0) {
            doc.setFontSize(14);  
            doc.setFont("helvetica", "normal");  
            doc.text(`Desconto: R$ ${orcamento.desconto.toFixed(2)}`, 10, 145);
            doc.setFontSize(12);  
            doc.text(`Valor sem desconto: R$ ${orcamento.soma.toFixed(2)}`, 20, 155);
            doc.setFontSize(14);  
            doc.text(`Valor total: R$ ${orcamento.total.toFixed(2)}`, 10, 165);
        } else{
            doc.setFont("helvetica", "bold");
            doc.text(`Valor total: R$ ${orcamento.total.toFixed(2)}`, 10, 145);
        }
    }else{
        if (orcamento.desconto > 0) {
            doc.setFontSize(14);  
            doc.setFont("helvetica", "normal");  
            doc.text(`Desconto: R$ ${orcamento.desconto.toFixed(2)}`, 10, 125);
            doc.setFontSize(12);  
            doc.text(`Valor sem desconto: R$ ${orcamento.soma.toFixed(2)}`, 20, 135);
            doc.setFontSize(14);  
            doc.text(`Valor total: R$ ${orcamento.total.toFixed(2)}`, 10, 145);
        } else{
            doc.setFont("helvetica", "bold");
            doc.text(`Valor total: R$ ${orcamento.total.toFixed(2)}`, 10, 125);

        }
    }




    doc.save("orcamento_finalizado.pdf");
    if(enviarMensagem){
        enviarOrcamentoWhatsapp(dadosCliente, orcamento, alturaParede, produtoVariacao)
    }
}