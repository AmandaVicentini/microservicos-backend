export interface ClienteProps {
  codigo?: number;
  nome: string;
  email: string;
}

export class Cliente {
  codigo: number;
  nome: string;
  email: string;

  constructor(props: ClienteProps) {
    this.codigo = props.codigo ?? 0;
    this.nome = props.nome;
    this.email = props.email;
  }
}
