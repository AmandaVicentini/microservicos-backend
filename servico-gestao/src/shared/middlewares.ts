import { ErrorRequestHandler, RequestHandler } from 'express';
import { AppError } from './errors/AppError';

export const notFoundHandler: RequestHandler = (_req, res) => {
  res.status(404).json({ mensagem: 'Rota não encontrada.' });
};

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ mensagem: error.message });
  }

  console.error(error);
  return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
};
