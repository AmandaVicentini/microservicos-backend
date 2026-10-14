import { Assinatura } from '../../domain/entities/Assinatura';
import { AssinaturaRepository } from '../../domain/repositories/AssinaturaRepository';
import { AppError } from '../../shared/errors/AppError';
import { dateOnly } from '../../shared/date';

export type TipoAssinatura = 'TODOS' | 'ATIVOS' | 'CANCELADOS';

// Regra da especificação: a assinatura está ativa quando existe uma data de
// último pagamento vigente (hoje ou posterior). O fim da fidelidade não participa
// da classificação do status.
export function isAtiva(assinatura: Assinatura): boolean {
  return assinatura.dataUltimoPagamento !== null
    && assinatura.dataUltimoPagamento >= dateOnly();
}

export function assinaturaResponse(assinatura: Assinatura) {
  return {
    codigoAssinatura: assinatura.codigo,
    codigoCliente: assinatura.codCli,
    codigoPlano: assinatura.codPlano,
    dataInicio: assinatura.inicioFidelidade,
    dataFim: assinatura.fimFidelidade,
    status: isAtiva(assinatura) ? 'ATIVO' : 'CANCELADO'
  };
}

export class ListarAssinaturas {
  constructor(private readonly repository: AssinaturaRepository) {}

  async execute(tipo: string) {
    const normalized = tipo.toUpperCase() as TipoAssinatura;

    if (!['TODOS', 'ATIVOS', 'CANCELADOS'].includes(normalized)) {
      throw new AppError(400, 'tipo deve ser TODOS, ATIVOS ou CANCELADOS.');
    }

    const assinaturas = await this.repository.listar();

    return assinaturas
      .filter((assinatura) => {
        if (normalized === 'TODOS') return true;
        return normalized === 'ATIVOS' ? isAtiva(assinatura) : !isAtiva(assinatura);
      })
      .map(assinaturaResponse);
  }
}
