import { Assinatura } from '../entities/Assinatura';

export interface AssinaturaRepository {
  criar(assinatura: Assinatura): Promise<Assinatura>;
  listar(): Promise<Assinatura[]>;
  listarPorCliente(codCli: number): Promise<Assinatura[]>;
  listarPorPlano(codPlano: number): Promise<Assinatura[]>;
  atualizarDataUltimoPagamento(codigo: number, data: string | null): Promise<Assinatura>;
}
