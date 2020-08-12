import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { Client } from './client.entity';
import { AuthGuard } from '@nestjs/passport';
import { ReadClientDto } from './dtos/read-client.dto';
import { CreateClientDto } from './dtos/create-client.dto';
import { UpdateClientDto } from './dtos/update-client.dto';

@UseGuards(AuthGuard())
@Controller('clients')
export class ClientController {
  constructor(private readonly __clientService: ClientService) {}

  @Get(':id')
  async getClient(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ReadClientDto> {
    const client = this.__clientService.get(id);

    return client;
  }

  @Get()
  async getClients(): Promise<ReadClientDto[]> {
    const clients = this.__clientService.getAll();

    return clients;
  }

  @Post()
  async create(@Body() client: Client): Promise<ReadClientDto> {
    const createdClient = this.__clientService.create(client);

    return createdClient;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() client: UpdateClientDto,
  ) {
    const updateClient = await this.__clientService.update(id, client);

    return updateClient;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.__clientService.delete(id);

    return { statusCode: 200, message: 'resource updated correctly' };
  }
}
