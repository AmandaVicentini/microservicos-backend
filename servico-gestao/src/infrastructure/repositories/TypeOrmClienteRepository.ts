import { Repository } from 'typeorm';
import { Cliente } from '../../domain/entities/Cliente';
import { ClienteRepository } from '../../domain/repositories/ClienteRepository';
import { ClienteOrm } from '../database/entities/ClienteOrm';
import { ClienteMapper } from '../database/mappers/ClienteMapper';

export class TypeOrmClienteRepository implements ClienteRepository {
  constructor(private readonly repository: Repository<ClienteOrm>) {}

  async listar(): Promise<Cliente[]> {
    const rows = await this.repository.find({ order: { codigo: 'ASC' } });
    return rows.map(ClienteMapper.toDomain);
  }

  async buscarPorCodigo(codigo: number): Promise<Cliente | null> {
    const row = await this.repository.findOne({ where: { codigo: String(codigo) } });
    return row ? ClienteMapper.toDomain(row) : null;
  }
}
