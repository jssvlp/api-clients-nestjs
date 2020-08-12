import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './client.entity';

import { ClientRepository } from './client.repository';
import { ReadClientDto } from './dtos/read-client.dto';
import { plainToClass } from 'class-transformer';
import { ReadProfileDto } from '../profile/dtos';
import { UpdateClientDto } from './dtos/update-client.dto';
import { CreateClientDto } from './dtos/create-client.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientRepository)
    private __clientRepository: ClientRepository,
  ) {}

  async get(id: number): Promise<ReadClientDto> {
    if (!id) {
      throw new BadRequestException('id must be sent');
    }

    const client: Client = await this.__clientRepository.findOne(id, {
      where: { status: 'active' },
    });

    if (!client) {
      throw new NotFoundException();
    }

    const profile = plainToClass(ReadProfileDto, client.profile);
    const _client = plainToClass(ReadClientDto, client);
    _client.profile = profile;

    return _client;
  }

  async getAll(): Promise<ReadClientDto[]> {
    const clients: Client[] = await this.__clientRepository.find({
      where: { status: 'active' },
    });

    if (!clients) {
      throw new NotFoundException();
    }

    const _clients: ReadClientDto[] = clients.map(client => {
      const profile = plainToClass(ReadProfileDto, client.profile);
      const _client = plainToClass(ReadClientDto, client);

      _client.profile = profile;

      console.log(client.addresses);

      return _client;
    });

    return _clients;
  }

  async create(client: Client): Promise<ReadClientDto> {
    const savedClient = await this.__clientRepository.save(client);

    return plainToClass(ReadClientDto, savedClient);
  }

  async update(id: number, client: UpdateClientDto): Promise<ReadClientDto> {
    const foundClient = await this.__clientRepository.findOne(id, {
      where: { status: 'active' },
    });

    if (!foundClient) {
      throw new NotFoundException('This client dos not exists');
    }

    foundClient.name = client.name;
    foundClient.firstLastName = client.firstLastName;
    foundClient.secondLastName = client.secondLastName;
    foundClient.birthDate = client.birthDate;

    foundClient.birthPlace = client.birthPlace;

    const updatedClient: Client = await this.__clientRepository.save(
      foundClient,
    );

    return plainToClass(ReadClientDto, updatedClient);
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
