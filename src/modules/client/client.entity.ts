import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
  UpdateDateColumn,
} from 'typeorm';
import Profile from '../profile/profile.entity';
import { Address } from '../address/address.entity';

@Entity('clients')
export class Client extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    name: 'first_last_name',
  })
  firstLastName: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
    name: 'second_last_name',
  })
  secondLastName: string;

  @CreateDateColumn({ type: Date, name: 'birth_date' })
  birthDate: Date;

  @Column({ type: 'varchar' })
  gender: string;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'birth_place',
    nullable: false,
  })
  birthPlace: string;

  @OneToOne(type => Profile, {
    cascade: false,
    nullable: true,
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;

  @OneToMany(
    type => Address,
    address => address.client,
  )
  addresses: Address[];

  @Column({ type: 'varchar', length: 8, nullable: false, default: 'active' })
  status: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updateAt: Date;
}
