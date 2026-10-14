import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { env } from '../../config/env';
import { ClienteOrm } from './entities/ClienteOrm';
import { PlanoOrm } from './entities/PlanoOrm';
import { AssinaturaOrm } from './entities/AssinaturaOrm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: env.db.host,
  port: env.db.port,
  username: env.db.username,
  password: env.db.password,
  database: env.db.database,
  synchronize: env.db.synchronize,
  logging: false,
  charset: 'utf8mb4',
  entities: [ClienteOrm, PlanoOrm, AssinaturaOrm]
});
