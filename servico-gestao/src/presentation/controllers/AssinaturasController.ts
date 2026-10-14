import { Request, Response } from 'express';
import { CriarAssinatura } from '../../application/use-cases/CriarAssinatura';
import { ListarAssinaturas } from '../../application/use-cases/ListarAssinaturas';
import { ListarAssinaturasCliente } from '../../application/use-cases/ListarAssinaturasCliente';
import { ListarAssinaturasPlano } from '../../application/use-cases/ListarAssinaturasPlano';

export class AssinaturasController {
  constructor(
    private readonly criarAssinatura: CriarAssinatura,
    private readonly listarAssinaturas: ListarAssinaturas,
    private readonly listarAssinaturasCliente: ListarAssinaturasCliente,
    private readonly listarAssinaturasPlano: ListarAssinaturasPlano
  ) {}

  async criar(req: Request, res: Response) {
    const assinatura = await this.criarAssinatura.execute({
      codCli: Number(req.body?.codCli),
      codPlano: Number(req.body?.codPlano),
      custoFinal: Number(req.body?.custoFinal),
      descricao: String(req.body?.descricao ?? '')
    });

    return res.status(201).json(assinatura);
  }

  async listarPorTipo(req: Request, res: Response) {
    return res.status(200).json(await this.listarAssinaturas.execute(req.params.tipo));
  }

  async listarPorCliente(req: Request, res: Response) {
    return res.status(200).json(
      await this.listarAssinaturasCliente.execute(Number(req.params.codcli))
    );
  }

  async listarPorPlano(req: Request, res: Response) {
    return res.status(200).json(
      await this.listarAssinaturasPlano.execute(Number(req.params.codplano))
    );
  }
}
