import { Request, Response } from 'express';
import { ListarClientes } from '../../application/use-cases/ListarClientes';

export class ClientesController {
  constructor(private readonly listarClientes: ListarClientes) {}

  async listar(_req: Request, res: Response) {
    return res.status(200).json(await this.listarClientes.execute());
  }
}
