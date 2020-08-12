import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { Address } from './address.entity';
import { getConnection } from 'typeorm';
import { Client } from '../client/client.entity';
import { CreateAddressDto } from './dtos';

@Controller('addresses')
export class AddressController {
  constructor(private readonly __addressService: AddressService) {}

  @Get(':id')
  async getAddress(@Param() id: number): Promise<Address> {
    const address = this.__addressService.get(id);

    return address;
  }

  @Get()
  async getAddresses(): Promise<Address[]> {
    const addresses = this.__addressService.getAll();

    return addresses;
  }

  @Post()
  async create(@Body() address: CreateAddressDto): Promise<Address> {
    const clientRepo = await getConnection().getRepository(Client);

    const client: Client = await clientRepo.findOne(address.clientId);

    if (!client) {
      throw new NotFoundException('client not found');
    }
    address.client = client;

    const createdAddress = this.__addressService.create(address);

    return createdAddress;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @Put(':id')
  async update(@Param() id: number, @Body() profile: Address) {
    const updatedAddress = await this.__addressService.update(id, profile);

    return { statusCode: 200, message: 'resource updated correctly' };
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.__addressService.delete(id);

    return { statusCode: 200, message: 'resource deleted correctly' };
  }
}
