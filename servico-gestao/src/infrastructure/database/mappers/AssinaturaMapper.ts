import { Assinatura } from '../../../domain/entities/Assinatura';
import { AssinaturaOrm } from '../entities/AssinaturaOrm';

// Mapper isola o domínio dos detalhes de persistência do TypeORM.
export class AssinaturaMapper {
  static toDomain(model: AssinaturaOrm): Assinatura {
    return new Assinatura({
      codigo: Number(model.codigo),
      codPlano: Number(model.codPlano),
      codCli: Number(model.codCli),
      inicioFidelidade: model.inicioFidelidade,
      fimFidelidade: model.fimFidelidade,
      dataUltimoPagamento: model.dataUltimoPagamento,
      custoFinal: Number(model.custoFinal),
      descricao: model.descricao
    });
  }

  static toPersistence(entity: Assinatura): AssinaturaOrm {
    const model = new AssinaturaOrm();
    if (entity.codigo > 0) model.codigo = String(entity.codigo);
    model.codPlano = String(entity.codPlano);
    model.codCli = String(entity.codCli);
    model.inicioFidelidade = entity.inicioFidelidade;
    model.fimFidelidade = entity.fimFidelidade;
    model.dataUltimoPagamento = entity.dataUltimoPagamento;
    model.custoFinal = entity.custoFinal.toFixed(2);
    model.descricao = entity.descricao;
    return model;
  }
}
