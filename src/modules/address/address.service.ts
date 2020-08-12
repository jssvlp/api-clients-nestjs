import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { AddressRepository } from './address.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './address.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressRepository)
    private readonly __addressRepository: AddressRepository,
  ) {}

  async get(id: number): Promise<Address> {
    if (!id) {
      throw new BadRequestException('id must be sent');
    }

    const address: Address = await this.__addressRepository.findOne(id);

    if (!address) {
      throw new NotFoundException();
    }

    return address;
  }

  async getAll(): Promise<Address[]> {
    const addresses: Address[] = await this.__addressRepository.find();

    if (!addresses) {
      throw new NotFoundException();
    }

    return addresses;
  }

  async create(address: Address): Promise<Address> {
    const savedAddress = await this.__addressRepository.save(address);

    return savedAddress;
  }

  async update(id: number, address: Address): Promise<void> {
    this.__addressRepository.update(id, address);
  }

  async delete(id: number): Promise<void> {
    const addressExists = this.__addressRepository.findOne(id);

    if (!addressExists) {
      throw new NotFoundException();
    }

    this.__addressRepository.delete(id);
  }
}
