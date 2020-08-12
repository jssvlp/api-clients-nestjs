import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ProfileRepository } from './profile.repository';
import { InjectRepository } from '@nestjs/typeorm';

import Profile from './profile.entity';
import { getConnection } from 'typeorm';
import { Client } from '../client/client.entity';

import { genSalt, hash } from 'bcryptjs';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileRepository)
    private readonly __profileRepository: ProfileRepository,
  ) {}

  async get(id: number): Promise<Profile> {
    if (!id) {
      throw new BadRequestException('id must be sent');
    }

    const profile = await this.__profileRepository.findOne(id);

    return profile;
  }

  async getAll(): Promise<Profile[]> {
    const profiles: Profile[] = await this.__profileRepository.find();

    return profiles;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async create(profile: Profile): Promise<Profile> {
    const clientRepo = await getConnection().getRepository(Client);
    const client: Client = await clientRepo.findOne(1);

    if (!client) {
      throw new NotFoundException('client does not exist');
    }

    const salt = await genSalt(10);
    profile.password = await hash(profile.password, salt);

    const profileCreated = await this.__profileRepository.create(profile);

    client.profile = profileCreated;
    clientRepo.save(client);

    return profileCreated;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async update(id: number, profile: Profile) {
    await this.__profileRepository.update(id, profile);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async delete(id: number) {
    await this.__profileRepository.delete(id);
  }
}
