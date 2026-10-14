import 'dotenv/config';

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Variável de ambiente obrigatória ausente: ${name}`);
  }
  return value;
}

const port = Number(process.env.PORT ?? 3000);
const dbPort = Number(process.env.DB_PORT ?? 3306);

if (!Number.isInteger(port) || port <= 0) {
  throw new Error('PORT inválida.');
}

if (!Number.isInteger(dbPort) || dbPort <= 0) {
  throw new Error('DB_PORT inválida.');
}

export const env = {
  port,
  nodeEnv: process.env.NODE_ENV ?? 'development',
  db: {
    host: required('DB_HOST'),
    port: dbPort,
    username: required('DB_USER'),
    password: required('DB_PASSWORD'),
    database: required('DB_NAME'),
    synchronize: (process.env.DB_SYNCHRONIZE ?? 'true').toLowerCase() === 'true'
  }
};
