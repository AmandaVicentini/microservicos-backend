CREATE TABLE IF NOT EXISTS clientes (
  codigo BIGINT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(150) NOT NULL,
  email VARCHAR(180) NOT NULL,
  PRIMARY KEY (codigo)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS planos (
  codigo BIGINT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(120) NOT NULL,
  custoMensal DECIMAL(10,2) NOT NULL,
  data DATE NOT NULL,
  descricao TEXT NOT NULL,
  PRIMARY KEY (codigo)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS assinaturas (
  codigo BIGINT NOT NULL AUTO_INCREMENT,
  codPlano BIGINT NOT NULL,
  codCli BIGINT NOT NULL,
  inicioFidelidade DATE NOT NULL,
  fimFidelidade DATE NOT NULL,
  dataUltimoPagamento DATE NULL,
  custoFinal DECIMAL(10,2) NOT NULL,
  descricao TEXT NOT NULL,
  PRIMARY KEY (codigo),
  INDEX idx_assinaturas_cliente (codCli),
  INDEX idx_assinaturas_plano (codPlano),
  CONSTRAINT fk_assinatura_cliente FOREIGN KEY (codCli) REFERENCES clientes(codigo),
  CONSTRAINT fk_assinatura_plano FOREIGN KEY (codPlano) REFERENCES planos(codigo)
) ENGINE=InnoDB;
