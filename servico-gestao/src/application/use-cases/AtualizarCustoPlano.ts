import { Plano } from '../../domain/entities/Plano';
import { PlanoRepository } from '../../domain/repositories/PlanoRepository';
import { AppError } from '../../shared/errors/AppError';

export class AtualizarCustoPlano {
  constructor(private readonly repository: PlanoRepository) {}

  async execute(codigo: number, custoMensal: number): Promise<Plano> {
    if (!Number.isInteger(codigo) || codigo <= 0) {
      throw new AppError(400, 'idPlano inválido.');
    }

    if (!Number.isFinite(custoMensal) || custoMensal <= 0) {
      throw new AppError(400, 'custoMensal deve ser um número maior que zero.');
    }

    return this.repository.atualizarCustoMensal(codigo, Number(custoMensal.toFixed(2)));
  }
}
