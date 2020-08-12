import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { Address } from './address.entity';

@Controller('address')
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
  async create(@Body() profile: Address): Promise<Address> {
    const createdAddress = this.__addressService.create(profile);

    return createdAddress;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @Put(':id')
  async update(@Param() id: number, @Body() profile: Address) {
    const updatedAddress = await this.__addressService.update(id, profile);

    return true;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.__addressService.delete(id);

    return true;
  }
}
