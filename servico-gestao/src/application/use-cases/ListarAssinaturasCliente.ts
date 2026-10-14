import { AssinaturaRepository } from '../../domain/repositories/AssinaturaRepository';
import { ClienteRepository } from '../../domain/repositories/ClienteRepository';
import { AppError } from '../../shared/errors/AppError';
import { assinaturaResponse } from './ListarAssinaturas';

export class ListarAssinaturasCliente {
  constructor(
    private readonly assinaturaRepository: AssinaturaRepository,
    private readonly clienteRepository: ClienteRepository
  ) {}

  async execute(codCli: number) {
    if (!Number.isInteger(codCli) || codCli <= 0) {
      throw new AppError(400, 'codcli inválido.');
    }

    const cliente = await this.clienteRepository.buscarPorCodigo(codCli);
    if (!cliente) {
      throw new AppError(404, 'Cliente não encontrado.');
    }

    return (await this.assinaturaRepository.listarPorCliente(codCli)).map(assinaturaResponse);
  }
}
