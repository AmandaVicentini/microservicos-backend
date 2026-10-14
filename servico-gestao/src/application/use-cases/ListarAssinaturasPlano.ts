import { AssinaturaRepository } from '../../domain/repositories/AssinaturaRepository';
import { PlanoRepository } from '../../domain/repositories/PlanoRepository';
import { AppError } from '../../shared/errors/AppError';
import { assinaturaResponse } from './ListarAssinaturas';

export class ListarAssinaturasPlano {
  constructor(
    private readonly assinaturaRepository: AssinaturaRepository,
    private readonly planoRepository: PlanoRepository
  ) {}

  async execute(codPlano: number) {
    if (!Number.isInteger(codPlano) || codPlano <= 0) {
      throw new AppError(400, 'codplano inválido.');
    }

    const plano = await this.planoRepository.buscarPorCodigo(codPlano);
    if (!plano) {
      throw new AppError(404, 'Plano não encontrado.');
    }

    return (await this.assinaturaRepository.listarPorPlano(codPlano)).map(assinaturaResponse);
  }
}
