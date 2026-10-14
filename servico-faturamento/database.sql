CREATE DATABASE IF NOT EXISTS faturamento;
USE faturamento;

CREATE TABLE IF NOT EXISTS cobrancas (
  codigo_cobranca VARCHAR(36) PRIMARY KEY,
  codigo_assinatura BIGINT NOT NULL,
  codigo_cliente BIGINT NULL,
  codigo_plano BIGINT NULL,
  valor DECIMAL(10,2) NOT NULL,
  vencimento DATE NOT NULL,
  status VARCHAR(20) NOT NULL,
  criada_em DATETIME(3) NOT NULL
);

CREATE TABLE IF NOT EXISTS pagamentos (
  codigo_pagamento VARCHAR(36) PRIMARY KEY,
  codigo_cobranca VARCHAR(36) NOT NULL,
  valor DECIMAL(10,2) NOT NULL,
  processado_em DATETIME(3) NOT NULL,
  status VARCHAR(20) NOT NULL,
  idempotency_key VARCHAR(120) NULL UNIQUE,
  CONSTRAINT fk_pagamentos_cobrancas FOREIGN KEY (codigo_cobranca) REFERENCES cobrancas(codigo_cobranca)
);
