import { Plano } from '../../domain/entities/Plano';
import { PlanoRepository } from '../../domain/repositories/PlanoRepository';

export class ListarPlanos {
  constructor(private readonly repository: PlanoRepository) {}

  execute(): Promise<Plano[]> {
    return this.repository.listar();
  }
}
