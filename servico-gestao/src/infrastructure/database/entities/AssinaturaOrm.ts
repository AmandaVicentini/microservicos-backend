import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'assinaturas' })
@Index(['codCli'])
@Index(['codPlano'])
export class AssinaturaOrm {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  codigo!: string;

  @Column({ type: 'bigint' })
  codPlano!: string;

  @Column({ type: 'bigint' })
  codCli!: string;

  @Column({ type: 'date' })
  inicioFidelidade!: string;

  @Column({ type: 'date' })
  fimFidelidade!: string;

  @Column({ type: 'date', nullable: true })
  dataUltimoPagamento!: string | null;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  custoFinal!: string;

  @Column({ type: 'text' })
  descricao!: string;
}
