CREATE DATABASE IF NOT EXISTS planos_ativos;
USE planos_ativos;

CREATE TABLE IF NOT EXISTS planos_ativos (
  codigo_assinatura BIGINT PRIMARY KEY,
  codigo_cliente BIGINT NOT NULL,
  codigo_plano BIGINT NOT NULL,
  valor DECIMAL(10,2) NOT NULL,
  data_ultimo_pagamento DATETIME(3) NOT NULL,
  atualizado_em DATETIME(3) NOT NULL,
  INDEX idx_planos_ativos_cliente (codigo_cliente),
  INDEX idx_planos_ativos_plano (codigo_plano)
);
