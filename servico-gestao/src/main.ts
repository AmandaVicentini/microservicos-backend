import { AppDataSource } from './infrastructure/database/data-source';
import { env } from './config/env';
import { createApp } from './app';

async function bootstrap() {
  await AppDataSource.initialize();

  const app = createApp(AppDataSource);
  const server = app.listen(env.port, () => {
    console.log(`ServicoGestao executando em http://localhost:${env.port}`);
  });

  const brokerUrl = process.env.BROKER_URL ?? 'http://localhost:4000';
  const callbackUrl = process.env.GESTAO_CALLBACK_URL ?? `http://localhost:${env.port}/internal/events`;
  fetch(`${brokerUrl}/subscriptions`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ eventType: '*', callbackUrl })
  }).catch((error) => console.error('Não foi possível registrar o ServicoGestao no broker:', error));

  const shutdown = async () => {
    server.close(async () => {
      if (AppDataSource.isInitialized) {
        await AppDataSource.destroy();
      }
      process.exit(0);
    });
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

bootstrap().catch((error) => {
  console.error('Falha ao iniciar o ServicoGestao:', error);
  process.exit(1);
});
