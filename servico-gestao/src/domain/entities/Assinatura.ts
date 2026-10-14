export interface AssinaturaProps {
  codigo?: number;
  codPlano: number;
  codCli: number;
  inicioFidelidade: string;
  fimFidelidade: string;
  dataUltimoPagamento: string | null;
  custoFinal: number;
  descricao: string;
}

export class Assinatura {
  codigo: number;
  codPlano: number;
  codCli: number;
  inicioFidelidade: string;
  fimFidelidade: string;
  dataUltimoPagamento: string | null;
  custoFinal: number;
  descricao: string;

  constructor(props: AssinaturaProps) {
    this.codigo = props.codigo ?? 0;
    this.codPlano = props.codPlano;
    this.codCli = props.codCli;
    this.inicioFidelidade = props.inicioFidelidade;
    this.fimFidelidade = props.fimFidelidade;
    this.dataUltimoPagamento = props.dataUltimoPagamento;
    this.custoFinal = props.custoFinal;
    this.descricao = props.descricao;
  }
}
