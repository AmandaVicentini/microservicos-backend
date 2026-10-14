import { Router } from 'express';
import { asyncHandler } from '../../shared/asyncHandler';
import { ClientesController } from '../controllers/ClientesController';
import { PlanosController } from '../controllers/PlanosController';
import { AssinaturasController } from '../controllers/AssinaturasController';

export function createGestaoRoutes(
  clientesController: ClientesController,
  planosController: PlanosController,
  assinaturasController: AssinaturasController
) {
  const router = Router();

  router.get('/clientes', asyncHandler((req, res) => clientesController.listar(req, res)));
  router.get('/planos', asyncHandler((req, res) => planosController.listar(req, res)));
  router.post('/assinaturas', asyncHandler((req, res) => assinaturasController.criar(req, res)));
  router.patch('/planos/:idPlano', asyncHandler((req, res) => planosController.atualizar(req, res)));
  router.get('/assinaturas/:tipo', asyncHandler((req, res) => assinaturasController.listarPorTipo(req, res)));
  router.get('/assinaturascliente/:codcli', asyncHandler((req, res) => assinaturasController.listarPorCliente(req, res)));
  router.get('/assinaturasplano/:codplano', asyncHandler((req, res) => assinaturasController.listarPorPlano(req, res)));

  return router;
}
