import { Cliente } from '../entities/Cliente';

export interface ClienteRepository {
  listar(): Promise<Cliente[]>;
  buscarPorCodigo(codigo: number): Promise<Cliente | null>;
}
