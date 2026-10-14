import cors from 'cors';
import express from 'express';
import { DataSource } from 'typeorm';
import { ListarClientes } from './application/use-cases/ListarClientes';
import { ListarPlanos } from './application/use-cases/ListarPlanos';
import { AtualizarCustoPlano } from './application/use-cases/AtualizarCustoPlano';
import { CriarAssinatura } from './application/use-cases/CriarAssinatura';
import { ListarAssinaturas } from './application/use-cases/ListarAssinaturas';
import { ListarAssinaturasCliente } from './application/use-cases/ListarAssinaturasCliente';
import { ListarAssinaturasPlano } from './application/use-cases/ListarAssinaturasPlano';
import { ClienteOrm } from './infrastructure/database/entities/ClienteOrm';
import { PlanoOrm } from './infrastructure/database/entities/PlanoOrm';
import { AssinaturaOrm } from './infrastructure/database/entities/AssinaturaOrm';
import { TypeOrmClienteRepository } from './infrastructure/repositories/TypeOrmClienteRepository';
import { TypeOrmPlanoRepository } from './infrastructure/repositories/TypeOrmPlanoRepository';
import { TypeOrmAssinaturaRepository } from './infrastructure/repositories/TypeOrmAssinaturaRepository';
import { createGestaoRoutes } from './presentation/routes/gestao.routes';
import { ClientesController } from './presentation/controllers/ClientesController';
import { PlanosController } from './presentation/controllers/PlanosController';
import { AssinaturasController } from './presentation/controllers/AssinaturasController';
import { errorHandler, notFoundHandler } from './shared/middlewares';

export function createApp(dataSource: DataSource) {
  const app = express();

  app.use(cors());
  app.use(express.json());

  // Composition Root: as dependências concretas são montadas aqui,
  // mantendo os casos de uso dependentes apenas de contratos de domínio.
  const clienteRepository = new TypeOrmClienteRepository(
    dataSource.getRepository(ClienteOrm)
  );
  const planoRepository = new TypeOrmPlanoRepository(
    dataSource.getRepository(PlanoOrm)
  );
  const assinaturaRepository = new TypeOrmAssinaturaRepository(
    dataSource.getRepository(AssinaturaOrm)
  );

  const clientesController = new ClientesController(new ListarClientes(clienteRepository));
  const planosController = new PlanosController(
    new ListarPlanos(planoRepository),
    new AtualizarCustoPlano(planoRepository)
  );
  const assinaturasController = new AssinaturasController(
    new CriarAssinatura(assinaturaRepository, clienteRepository, planoRepository),
    new ListarAssinaturas(assinaturaRepository),
    new ListarAssinaturasCliente(assinaturaRepository, clienteRepository),
    new ListarAssinaturasPlano(assinaturaRepository, planoRepository)
  );

  app.get('/health', (_req, res) => res.status(200).json({ status: 'ok', service: 'servico-gestao' }));
  app.post('/internal/events', async (req, res) => {
    const event = req.body ?? {};
    const codigoAssinatura = Number(event.payload?.codigoAssinatura);
    if (!event.eventType || !Number.isInteger(codigoAssinatura)) {
      return res.status(400).json({ message: 'Evento ou codigoAssinatura inválido.' });
    }
    if (event.eventType === 'PagamentoAprovado') {
      await assinaturaRepository.atualizarDataUltimoPagamento(codigoAssinatura, event.payload.processadoEm ?? new Date().toISOString());
    } else if (['PagamentoRecusado', 'PagamentoEstornado', 'AssinaturaCancelada'].includes(event.eventType)) {
      await assinaturaRepository.atualizarDataUltimoPagamento(codigoAssinatura, null);
    }
    return res.status(202).json({ accepted: true, eventId: event.eventId });
  });
  app.use('/gestao', createGestaoRoutes(clientesController, planosController, assinaturasController));
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
