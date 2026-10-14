import { Request, Response } from 'express';
import { AtualizarCustoPlano } from '../../application/use-cases/AtualizarCustoPlano';
import { ListarPlanos } from '../../application/use-cases/ListarPlanos';

export class PlanosController {
  constructor(
    private readonly listarPlanos: ListarPlanos,
    private readonly atualizarCustoPlano: AtualizarCustoPlano
  ) {}

  async listar(_req: Request, res: Response) {
    return res.status(200).json(await this.listarPlanos.execute());
  }

  async atualizar(req: Request, res: Response) {
    const idPlano = Number(req.params.idPlano);
    const custoMensal = Number(req.body?.custoMensal);
    const plano = await this.atualizarCustoPlano.execute(idPlano, custoMensal);
    return res.status(200).json(plano);
  }
}
