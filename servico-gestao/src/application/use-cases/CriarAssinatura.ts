import { Assinatura } from '../../domain/entities/Assinatura';
import { AssinaturaRepository } from '../../domain/repositories/AssinaturaRepository';
import { ClienteRepository } from '../../domain/repositories/ClienteRepository';
import { PlanoRepository } from '../../domain/repositories/PlanoRepository';
import { AppError } from '../../shared/errors/AppError';
import { addDays, dateOnly } from '../../shared/date';

export interface CriarAssinaturaInput {
  codCli: number;
  codPlano: number;
  custoFinal: number;
  descricao: string;
}

export class CriarAssinatura {
  constructor(
    private readonly assinaturaRepository: AssinaturaRepository,
    private readonly clienteRepository: ClienteRepository,
    private readonly planoRepository: PlanoRepository
  ) {}

  async execute(input: CriarAssinaturaInput): Promise<Assinatura> {
    // As regras do caso de uso ficam na camada Application, sem depender do Express ou TypeORM.
    if (!Number.isInteger(input.codCli) || input.codCli <= 0) {
      throw new AppError(400, 'codCli deve ser um inteiro positivo.');
    }

    if (!Number.isInteger(input.codPlano) || input.codPlano <= 0) {
      throw new AppError(400, 'codPlano deve ser um inteiro positivo.');
    }

    if (!Number.isFinite(input.custoFinal) || input.custoFinal <= 0) {
      throw new AppError(400, 'custoFinal deve ser um número maior que zero.');
    }

    if (!input.descricao?.trim()) {
      throw new AppError(400, 'descricao é obrigatória.');
    }

    // O código da especificação exige que cliente e plano existam antes da contratação.
    const [cliente, plano] = await Promise.all([
      this.clienteRepository.buscarPorCodigo(input.codCli),
      this.planoRepository.buscarPorCodigo(input.codPlano)
    ]);

    if (!cliente) {
      throw new AppError(404, 'Cliente não encontrado.');
    }

    if (!plano) {
      throw new AppError(404, 'Plano não encontrado.');
    }

    // Toda nova assinatura inicia uma fidelidade de 365 dias a partir da contratação.
    const inicio = new Date();

    return this.assinaturaRepository.criar(
      new Assinatura({
        codCli: input.codCli,
        codPlano: input.codPlano,
        inicioFidelidade: dateOnly(inicio),
        fimFidelidade: addDays(inicio, 365),
        dataUltimoPagamento: null,
        custoFinal: Number(input.custoFinal.toFixed(2)),
        descricao: input.descricao.trim()
      })
    );
  }
}
