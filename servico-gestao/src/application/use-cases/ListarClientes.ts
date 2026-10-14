import { Cliente } from '../../domain/entities/Cliente';
import { ClienteRepository } from '../../domain/repositories/ClienteRepository';

export class ListarClientes {
  constructor(private readonly repository: ClienteRepository) {}

  execute(): Promise<Cliente[]> {
    return this.repository.listar();
  }
}
