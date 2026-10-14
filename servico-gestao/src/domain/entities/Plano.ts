export interface PlanoProps {
  codigo?: number;
  nome: string;
  custoMensal: number;
  data: string;
  descricao: string;
}

export class Plano {
  codigo: number;
  nome: string;
  custoMensal: number;
  data: string;
  descricao: string;

  constructor(props: PlanoProps) {
    this.codigo = props.codigo ?? 0;
    this.nome = props.nome;
    this.custoMensal = props.custoMensal;
    this.data = props.data;
    this.descricao = props.descricao;
  }
}
