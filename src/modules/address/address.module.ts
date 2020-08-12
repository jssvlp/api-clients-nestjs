import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressRepository } from './address.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AddressRepository])],
})
export class AddressModule {}
