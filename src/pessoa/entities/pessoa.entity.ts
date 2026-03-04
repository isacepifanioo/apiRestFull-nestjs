import { Recado } from 'src/recado/entities/recado.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Pessoa {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ unique: true })
  email: string;
  @Column()
  passwordHash: string;

  @OneToMany(() => Recado, (recado) => recado.deId, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  recadoDeId: Recado[];
  @OneToMany(() => Recado, (recado) => recado.paraId, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  recadoParaId: Recado[];

  @CreateDateColumn()
  createAt: Date;
  @UpdateDateColumn()
  updateAt: Date;
}
