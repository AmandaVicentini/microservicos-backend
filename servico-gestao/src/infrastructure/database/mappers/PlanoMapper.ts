import { Plano } from '../../../domain/entities/Plano';
import { PlanoOrm } from '../entities/PlanoOrm';

export class PlanoMapper {
  static toDomain(model: PlanoOrm): Plano {
    return new Plano({
      codigo: Number(model.codigo),
      nome: model.nome,
      custoMensal: Number(model.custoMensal),
      data: model.data,
      descricao: model.descricao
    });
  }
}
