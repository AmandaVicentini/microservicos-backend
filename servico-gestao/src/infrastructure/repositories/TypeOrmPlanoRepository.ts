import { Repository } from 'typeorm';
import { Plano } from '../../domain/entities/Plano';
import { PlanoRepository } from '../../domain/repositories/PlanoRepository';
import { AppError } from '../../shared/errors/AppError';
import { dateOnly } from '../../shared/date';
import { PlanoOrm } from '../database/entities/PlanoOrm';
import { PlanoMapper } from '../database/mappers/PlanoMapper';

export class TypeOrmPlanoRepository implements PlanoRepository {
  constructor(private readonly repository: Repository<PlanoOrm>) {}

  async listar(): Promise<Plano[]> {
    const rows = await this.repository.find({ order: { codigo: 'ASC' } });
    return rows.map(PlanoMapper.toDomain);
  }

  async buscarPorCodigo(codigo: number): Promise<Plano | null> {
    const row = await this.repository.findOne({ where: { codigo: String(codigo) } });
    return row ? PlanoMapper.toDomain(row) : null;
  }

  async atualizarCustoMensal(codigo: number, custoMensal: number): Promise<Plano> {
    const row = await this.repository.findOne({ where: { codigo: String(codigo) } });
    if (!row) {
      throw new AppError(404, 'Plano não encontrado.');
    }

    row.custoMensal = custoMensal.toFixed(2);
    row.data = dateOnly();

    return PlanoMapper.toDomain(await this.repository.save(row));
  }
}
