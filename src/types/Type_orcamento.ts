export type TypeOrcamento = {
    produto: string,
    total: number,
    soma: number,
    desconto: number,
    dutos: {qt: number, valor: number},
    modulos: {qt: number, valor: number}
}