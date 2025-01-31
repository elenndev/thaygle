import { useState } from "react"
import { TypeDadosCliente, TypeOrcamento} from "../../types"
import Churrasqueiras from "../../utilities/Churrasqueiras"
import Produtos from "../../utilities/Produtos"
import { jsPDF } from "jspdf";


type valorTotalProps = {
    alturaParede: number;
    produto: string;
    tipo: string;
    nome: string
    qtProdutos: number;
    callback: (status: boolean, orcamento: TypeOrcamento | undefined) => void;
}

type enviarOrcamentoWhatsappProps = {
    dadosCliente: TypeDadosCliente | null,
    orcamento: TypeOrcamento,
    alturaParede: number,
    produtoVariacao: string | undefined
}

type GerarPdfOrcamentoProps = {
    dadosCliente: TypeDadosCliente | null,
    orcamento: TypeOrcamento, 
    alturaParede: number, 
    produtoVariacao: string | undefined, 
    enviarMensagem: boolean}

export function useOrcamento(){
    const [isLaje, setIsLaje] = useState(false)
    const [dadosCliente, setDadosCliente] = useState<TypeDadosCliente | null>(null)

    function buscarProduto(produtoId: number){
        return Churrasqueiras.find((e)=> e.id == produtoId)
    }

    function ObterValorDoProduto(produto: string, tipo: string, qt:number): number{
        const item = Produtos.find((e) => e.infos.produto === produto && e.infos.tipo === tipo);
    
        if (item) {
            const result = item.infos.valor * qt;
            return result; 
        }
    
        return 0;
    }

    function getValorDecimal(number: number){
        const string = number.toString()
        const decimalPartIndex = string.indexOf('.')
        if(decimalPartIndex === -1 || decimalPartIndex + 1 >= string.length){
            return 0
        }

        return parseInt(string.charAt(decimalPartIndex + 1))
    }

    function arredondarResultado(dec: number, base: number){
        if(dec < 5){
            return Math.floor(base)
        } else if (dec >= 5 && dec < 9){
            return parseFloat(`${base.toString().split('.')[0]}.5`)
        } else if (dec > 9){
            return Math.ceil(base)
        } else{
            return 0
        }
    } 

    function calcDutos(alturaParede: number): number{
        const base = ( alturaParede - 190) /25
        function getDutos(base: number): number {
            const dec = getValorDecimal(base)
            if (dec >= 1){
                return Math.floor(base) + 2
            } else { return base + 1}
        }       
        return getDutos(base)
    }

    function calcModulos(alturaParede: number): number{
        const base = ( alturaParede - 200) / 50
        function getModulos(base: number): number {
            const dec = getValorDecimal(base)
            return arredondarResultado(dec, base)            
        }       
        return getModulos(base)
    }

    function valorTotal({props}:{props: valorTotalProps}){
        const {alturaParede, produto, tipo, nome, qtProdutos, callback} = props
        const perguntaLaje = document.querySelector('.perguntaLaje')
        perguntaLaje?.classList.remove('flex')
        perguntaLaje?.classList.add('hidden')
        const qtDutos = calcDutos(alturaParede)
        let valorDutos = 0
        let qtModulos = 0
        let valorModulos = 0    
        

        if(produto == 'predial'){
            qtModulos = calcModulos(alturaParede)
            valorModulos = ObterValorDoProduto('modulo', 'predial', qtModulos) ?? 0
            valorDutos = ObterValorDoProduto('duto', 'liso', qtDutos) ?? 0
        } else if (tipo == 'tijolinho' || tipo == 'tijolinho balcao'){
            valorDutos = ObterValorDoProduto('duto', 'tijolinho', qtDutos) ?? 0
        }
        const valorUn_produto = ObterValorDoProduto(produto, tipo, 1)
        const valorProduto = qtProdutos * valorUn_produto
        const soma = valorDutos + valorModulos + valorProduto
        const orcamento = {
            produto: nome,
            total: soma,
            soma: soma,
            desconto: 0,
            dutos: {qt: qtDutos, valor: valorDutos},
            modulos: {qt: qtModulos, valor: valorModulos}
        }
        callback(true, orcamento)
    }

    function enviarOrcamentoWhatsapp({props}: {props: enviarOrcamentoWhatsappProps}) {
        const { dadosCliente,
            orcamento,
            alturaParede,
            produtoVariacao } = props
        if (!dadosCliente || !orcamento) {
            console.log('falha ao acessar dados do cliente/orçamento');
            return;
        }
        if (!dadosCliente){
            return console.log("erro ao acessar dados do cliente")
        }
        const admTel = process.env.NEXT_PUBLIC_TEL;
        console.log(admTel)
        let mensagem = `-- Orçamento --\n`;
        mensagem += `Nome: ${dadosCliente.nome}\n`;
        mensagem += `Cpf: ${dadosCliente.cpf}\n`;
        mensagem += `Endereço: ${dadosCliente.endereco}\n`;
        mensagem += `Contato: ${dadosCliente.telefone}\n`;
        mensagem += `-------------\n`;
        mensagem += `Produto: ${orcamento.produto || produtoVariacao}\n`;
        mensagem += `Altura total da parede: ${alturaParede}\n`;
        mensagem += `Quantidade de dutos: ${orcamento.dutos.qt}\n`;
        mensagem += `Valor dos dutos: R$ ${orcamento.dutos.valor.toFixed(2)}\n`;
        
        if (orcamento.modulos.qt > 0) {
            mensagem += `Quantidade de módulos: ${orcamento.modulos.qt}\n`;
            mensagem += `Valor dos módulos: R$ ${orcamento.modulos.valor.toFixed(2)}\n`;
        }
        
        if (orcamento.desconto > 0) {
            mensagem += `Valor sem desconto: R$ ${orcamento.soma.toFixed(2)}\n`;
            mensagem += `Desconto: R$ ${orcamento.desconto.toFixed(2)}\n`;
            mensagem += `Valor Total: R$ ${orcamento.total.toFixed(2)}\n`;
        } else {
            mensagem += `Valor Total: R$ ${orcamento.total.toFixed(2)}\n`;
        }
        
        const whatsappUrl = `https://wa.me/${admTel}?text=${encodeURIComponent(mensagem)}`;
        
        window.open(whatsappUrl, "_blank");
    }

    function GerarPdfOrcamento({props}: {props: GerarPdfOrcamentoProps}){
        const {dadosCliente,
            orcamento, 
            alturaParede, 
            produtoVariacao, 
            enviarMensagem} = props
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
            enviarOrcamentoWhatsapp({props:{
                dadosCliente,
                orcamento,
                alturaParede, produtoVariacao}})
        }
    }

    return{
        isLaje,
        setIsLaje,
        dadosCliente,
        setDadosCliente,
        buscarProduto,
        valorTotal,
        GerarPdfOrcamento
    }
}