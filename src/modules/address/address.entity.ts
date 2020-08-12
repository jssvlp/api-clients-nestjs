import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Client } from '../client/client.entity';

@Entity('addresses')
export class Address extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  country: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  state: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  city: string;

  @Column({ type: 'varchar', length: 10, nullable: true, name: 'postal_code' })
  postalCode: string;

  @Column({
    type: 'varchar',
    length: 150,
    nullable: false,
    name: 'address_line_one',
  })
  addressLineOne: string;

  @Column({
    type: 'varchar',
    length: 150,
    nullable: true,
    name: 'address_line_two',
  })
  addressLineTwo: string;

  @ManyToOne(
    type => Client,
    client => client.addresses,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @Column({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'timestamp', name: 'updated_at' })
  updateAt: Date;
}
