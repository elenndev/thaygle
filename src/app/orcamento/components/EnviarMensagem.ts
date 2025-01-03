import TypeDadosCliente from "@/app/components/Type_dadosCliente";
import TypeOrcamento from "@/app/components/Type_orcamento";

export default function enviarOrcamentoWhatsapp(
    dadosCliente: TypeDadosCliente | null,
    orcamento: TypeOrcamento,
    alturaParede: number,
    produtoVariacao: string | undefined,
  ) {
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