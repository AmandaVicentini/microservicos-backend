import { AppDataSource } from '../infrastructure/database/data-source';
import { ClienteOrm } from '../infrastructure/database/entities/ClienteOrm';
import { PlanoOrm } from '../infrastructure/database/entities/PlanoOrm';
import { AssinaturaOrm } from '../infrastructure/database/entities/AssinaturaOrm';
import { addDays, dateOnly } from '../shared/date';

async function seed() {
  await AppDataSource.initialize();

  const clienteRepo = AppDataSource.getRepository(ClienteOrm);
  const planoRepo = AppDataSource.getRepository(PlanoOrm);
  const assinaturaRepo = AppDataSource.getRepository(AssinaturaOrm);

  await assinaturaRepo.clear();
  await clienteRepo.clear();
  await planoRepo.clear();

  const clientes = clienteRepo.create([
    { nome: 'Amanda Silva', email: 'amanda.silva@email.com' },
    { nome: 'Bruno Souza', email: 'bruno.souza@email.com' },
    { nome: 'Camila Oliveira', email: 'camila.oliveira@email.com' },
    { nome: 'Diego Santos', email: 'diego.santos@email.com' },
    { nome: 'Eduarda Lima', email: 'eduarda.lima@email.com' },
    { nome: 'Felipe Costa', email: 'felipe.costa@email.com' },
    { nome: 'Gabriela Martins', email: 'gabriela.martins@email.com' },
    { nome: 'Henrique Rocha', email: 'henrique.rocha@email.com' },
    { nome: 'Isabela Alves', email: 'isabela.alves@email.com' },
    { nome: 'Joao Pereira', email: 'joao.pereira@email.com' }
  ]);
  await clienteRepo.save(clientes);

  const hoje = dateOnly();
  const planos = planoRepo.create([
    { nome: 'Fibra 300', custoMensal: '89.90', data: hoje, descricao: 'Internet fibra optica de 300 Mbps.' },
    { nome: 'Fibra 500', custoMensal: '109.90', data: hoje, descricao: 'Internet fibra optica de 500 Mbps.' },
    { nome: 'Fibra 700', custoMensal: '129.90', data: hoje, descricao: 'Internet fibra optica de 700 Mbps.' },
    { nome: 'Fibra 1 Giga', custoMensal: '159.90', data: hoje, descricao: 'Internet fibra optica de 1 Gbps.' },
    { nome: 'Combo Premium', custoMensal: '199.90', data: hoje, descricao: 'Internet fibra com TV e beneficios adicionais.' }
  ]);
  await planoRepo.save(planos);

  const inicio = new Date();
  const assinaturas = assinaturaRepo.create([
    {
      codCli: '1',
      codPlano: '1',
      inicioFidelidade: hoje,
      fimFidelidade: addDays(inicio, 365),
      dataUltimoPagamento: hoje,
      custoFinal: '79.90',
      descricao: 'Desconto de fidelidade de lancamento.'
    },
    {
      codCli: '2',
      codPlano: '2',
      inicioFidelidade: hoje,
      fimFidelidade: addDays(inicio, 365),
      dataUltimoPagamento: hoje,
      custoFinal: '99.90',
      descricao: 'Desconto promocional de fidelidade.'
    },
    {
      codCli: '3',
      codPlano: '3',
      inicioFidelidade: hoje,
      fimFidelidade: addDays(inicio, 365),
      dataUltimoPagamento: hoje,
      custoFinal: '119.90',
      descricao: 'Condicao especial para novo cliente.'
    },
    {
      codCli: '4',
      codPlano: '4',
      inicioFidelidade: addDays(inicio, -430),
      fimFidelidade: addDays(inicio, -65),
      dataUltimoPagamento: addDays(inicio, -65),
      custoFinal: '149.90',
      descricao: 'Assinatura com fidelidade encerrada.'
    },
    {
      codCli: '5',
      codPlano: '5',
      inicioFidelidade: addDays(inicio, -500),
      fimFidelidade: addDays(inicio, -135),
      dataUltimoPagamento: addDays(inicio, -135),
      custoFinal: '179.90',
      descricao: 'Assinatura encerrada para testes.'
    }
  ]);
  await assinaturaRepo.save(assinaturas);

  console.log('Seed concluido: 10 clientes, 5 planos e 5 assinaturas.');
  await AppDataSource.destroy();
}

seed().catch(async (error) => {
  console.error('Falha no seed:', error);
  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy();
  }
  process.exit(1);
});
