import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Patch,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { Client } from './client.entity';

@Controller('clients')
export class ClientController {
  constructor(private readonly __clientService: ClientService) {}

  @Get(':id')
  async getClient(@Param() id: number): Promise<Client> {
    const client = this.__clientService.get(id);

    return client;
  }

  @Get()
  async getClients(): Promise<Client[]> {
    const users = this.__clientService.getAll();

    return users;
  }

  @Post()
  async create(@Body() client: Client): Promise<Client> {
    const createdClient = this.__clientService.create(client);

    return createdClient;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @Put(':id')
  async update(@Param() id: number, @Body() client: Client) {
    const updateUser = await this.__clientService.update(id, client);

    return true;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.__clientService.delete(id);

    return true;
  }
}
