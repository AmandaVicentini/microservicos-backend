import { Cliente } from '../../../domain/entities/Cliente';
import { ClienteOrm } from '../entities/ClienteOrm';

export class ClienteMapper {
  static toDomain(model: ClienteOrm): Cliente {
    return new Cliente({
      codigo: Number(model.codigo),
      nome: model.nome,
      email: model.email
    });
  }
}
