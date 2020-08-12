import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './client.entity';

import { ClientRepository } from './client.repository';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientRepository)
    private __clientRepository: ClientRepository,
  ) {}

  async get(id: number): Promise<Client> {
    if (!id) {
      throw new BadRequestException('id must be sent');
    }

    const client: Client = await this.__clientRepository.findOne(id, {
      where: { status: 'active' },
    });

    if (!client) {
      throw new NotFoundException();
    }

    return client;
  }

  async getAll(): Promise<Client[]> {
    const clients: Client[] = await this.__clientRepository.find({
      where: { status: 'active' },
    });

    if (!clients) {
      throw new NotFoundException();
    }

    return clients;
  }

  async create(client: Client): Promise<Client> {
    const savedClient = await this.__clientRepository.save(client);

    return savedClient;
  }

  async update(id: number, client: Client): Promise<void> {
    this.__clientRepository.update(id, client);
  }

  async delete(id: number): Promise<void> {
    const clientExists = this.__clientRepository.findOne(id, {
      where: { status: 'activo' },
    });

    if (!clientExists) {
      throw new NotFoundException();
    }

    this.__clientRepository.delete(id);
  }
}
