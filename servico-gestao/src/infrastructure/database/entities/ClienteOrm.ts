import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'clientes' })
export class ClienteOrm {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  codigo!: string;

  @Column({ type: 'varchar', length: 150 })
  nome!: string;

  @Column({ type: 'varchar', length: 180 })
  email!: string;
}
