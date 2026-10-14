# Sistema de Controle de Planos de Operadora - Fase 1

Projeto individual da disciplina Desenvolvimento de Sistemas Backend.

## Escopo desta fase

A Fase 1 implementa o **ServicoGestao**, responsavel pelas operacoes previstas no enunciado para clientes, planos e assinaturas.

Os microsservicos **ServicoFaturamento** e **ServicoPlanosAtivos** fazem parte da modelagem geral do sistema, mas seus endpoints e eventos pertencem à Fase 2 e, portanto, nao sao implementados nesta entrega. O mapeamento detalhado dessas responsabilidades, endpoints, eventos, persistencia e cache esta no arquivo `../MAPEAMENTO-FASE-2.md`.

## Tecnologias

- Node.js 20+
- TypeScript 5+
- Express
- TypeORM
- MySQL
- Postman
- Clean Architecture + SOLID

## Configuracao do banco

1. Copie `.env.example` para `.env`.
2. Preencha `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD` e `DB_NAME` com os dados do banco utilizado.
3. Mantenha `DB_SYNCHRONIZE=true` para permitir que o TypeORM crie/ajuste as tabelas automaticamente.

O arquivo `.env` nao faz parte da entrega por conter credenciais de ambiente; apenas `.env.example` e enviado.

## Instalacao

```bash
cd servico-gestao
npm install
```

## Criacao da estrutura e carga inicial

Execute:

```bash
npm run seed
```

O seed recria as tabelas/entidades por meio do TypeORM e popula o banco com **10 clientes, 5 planos e 5 assinaturas**, conforme solicitado pela especificacao.

## Execucao

Desenvolvimento:

```bash
npm run dev
```

Build e execucao:

```bash
npm run build
npm start
```

Health check:

```text
GET http://localhost:3000/health
```

## Endpoints da Fase 1

| Metodo | Endpoint | Descricao |
|---|---|---|
| GET | `/gestao/clientes` | Lista todos os clientes |
| GET | `/gestao/planos` | Lista todos os planos |
| POST | `/gestao/assinaturas` | Cria uma assinatura |
| PATCH | `/gestao/planos/:idPlano` | Atualiza o custo mensal de um plano |
| GET | `/gestao/assinaturas/:tipo` | Lista `TODOS`, `ATIVOS` ou `CANCELADOS` |
| GET | `/gestao/assinaturascliente/:codcli` | Lista assinaturas de um cliente |
| GET | `/gestao/assinaturasplano/:codplano` | Lista assinaturas de um plano |

## Regras principais implementadas

- Cliente e plano precisam existir para criar uma assinatura.
- Nova assinatura inicia a fidelidade na data da contratação.
- A fidelidade inicial possui 365 dias.
- A assinatura é considerada `ATIVO` quando `dataUltimoPagamento` existe e é vigente (hoje ou posterior); caso contrário, é `CANCELADO`. `fimFidelidade` informa o período de fidelidade, mas não determina o status.
- A atualização do custo mensal também atualiza a data de modificação do plano.
- O custo final e a descrição da fidelidade são armazenados na assinatura.

## Estrutura do projeto

```text
servico-gestao/
├── src/
│   ├── domain/           # entidades e contratos de repositorio
│   ├── application/      # casos de uso e regras da aplicacao
│   ├── infrastructure/  # TypeORM, mapeamento e persistencia
│   ├── presentation/    # controllers e rotas HTTP
│   ├── config/           # configuracao de ambiente
│   ├── shared/           # erros, datas, middlewares e utilitarios
│   └── seed/             # carga de dados iniciais
├── database.sql
├── .env.example
├── package.json
└── tsconfig.json
```

## Postman

O arquivo da colecao esta na raiz da entrega:

```text
amanda_Desenvolvimento_de_Sistemas_backend_Fase-1.postman_collection.json
```

A variavel `baseUrl` esta definida como `http://localhost:3000`. A coleção foi preservada nesta revisão e continua cobrindo os endpoints implementados da Fase 1.

## SQL manual

O arquivo `database.sql` contem a estrutura equivalente das tabelas do `ServicoGestao` para referencia e criacao manual, caso necessario.
