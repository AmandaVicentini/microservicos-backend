import { Repository } from 'typeorm';
import { Assinatura } from '../../domain/entities/Assinatura';
import { AssinaturaRepository } from '../../domain/repositories/AssinaturaRepository';
import { AssinaturaOrm } from '../database/entities/AssinaturaOrm';
import { AssinaturaMapper } from '../database/mappers/AssinaturaMapper';

// Adapter de persistência: implementa o contrato do domínio utilizando TypeORM/MySQL.
export class TypeOrmAssinaturaRepository implements AssinaturaRepository {
  constructor(private readonly repository: Repository<AssinaturaOrm>) {}

  async criar(assinatura: Assinatura): Promise<Assinatura> {
    const saved = await this.repository.save(AssinaturaMapper.toPersistence(assinatura));
    return AssinaturaMapper.toDomain(saved);
  }

  async listar(): Promise<Assinatura[]> {
    const rows = await this.repository.find({ order: { codigo: 'ASC' } });
    return rows.map(AssinaturaMapper.toDomain);
  }

  async listarPorCliente(codCli: number): Promise<Assinatura[]> {
    const rows = await this.repository.find({
      where: { codCli: String(codCli) },
      order: { codigo: 'ASC' }
    });
    return rows.map(AssinaturaMapper.toDomain);
  }

  async listarPorPlano(codPlano: number): Promise<Assinatura[]> {
    const rows = await this.repository.find({
      where: { codPlano: String(codPlano) },
      order: { codigo: 'ASC' }
    });
    return rows.map(AssinaturaMapper.toDomain);
  }

  async atualizarDataUltimoPagamento(codigo: number, data: string | null): Promise<Assinatura> {
    const model = await this.repository.findOne({ where: { codigo: String(codigo) } });
    if (!model) throw new Error('Assinatura não encontrada.');
    model.dataUltimoPagamento = data ? data.slice(0, 10) : null;
    const saved = await this.repository.save(model);
    return AssinaturaMapper.toDomain(saved);
  }
}
