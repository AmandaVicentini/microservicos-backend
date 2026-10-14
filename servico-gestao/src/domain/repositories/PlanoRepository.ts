import { Plano } from '../entities/Plano';

export interface PlanoRepository {
  listar(): Promise<Plano[]>;
  buscarPorCodigo(codigo: number): Promise<Plano | null>;
  atualizarCustoMensal(codigo: number, custoMensal: number): Promise<Plano>;
}
