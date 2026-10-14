import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'planos' })
export class PlanoOrm {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  codigo!: string;

  @Column({ type: 'varchar', length: 120 })
  nome!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  custoMensal!: string;

  @Column({ type: 'date' })
  data!: string;

  @Column({ type: 'text' })
  descricao!: string;
}
