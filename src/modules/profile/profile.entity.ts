import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('profiles')
export default class Profile extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({})
  email: string;

  @Column({})
  password: string;

  @Column({})
  picture: string;

  @Column({ type: 'varchar', nullable: false, default: 'active', length: 8 })
  status: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updateAt: Date;
}
