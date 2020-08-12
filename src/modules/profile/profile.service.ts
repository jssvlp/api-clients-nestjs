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
import { ReadProfileDto, CreateProfileDto, UpdateProfileDto } from './dtos';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileRepository)
    private readonly __profileRepository: ProfileRepository,
  ) {}

  async get(id: number): Promise<ReadProfileDto> {
    if (!id) {
      throw new BadRequestException('id must be sent');
    }

    const profile: Profile = await this.__profileRepository.findOne(id);

    return plainToClass(ReadProfileDto, profile);
  }

  async getAll(): Promise<ReadProfileDto[]> {
    const profiles: Profile[] = await this.__profileRepository.find();

    return profiles.map(profile => plainToClass(ReadProfileDto, profile));
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async create(profile: Partial<CreateProfileDto>): Promise<ReadProfileDto> {
    const clientRepo = await getConnection().getRepository(Client);
    const client: Client = await clientRepo.findOne(profile.clientId);

    if (!client) {
      throw new NotFoundException('client does not exist');
    }

    profile.password = await this.encryptPassword(profile.password);

    const profileCreated = await this.__profileRepository.save(profile);

    client.profile = profileCreated;
    clientRepo.save(client);

    return plainToClass(ReadProfileDto, profile);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async update(
    id: number,
    profile: Partial<UpdateProfileDto>,
  ): Promise<ReadProfileDto> {
    const foundProfile = await this.__profileRepository.findOne(id, {
      where: { status: 'active' },
    });

    if (!foundProfile) {
      throw new NotFoundException('This profile dos not exists');
    }

    foundProfile.email = profile.email;
    foundProfile.username = profile.username;
    foundProfile.password = await this.encryptPassword(profile.password);

    const updatedProfile: Profile = await this.__profileRepository.save(
      foundProfile,
    );

    return plainToClass(ReadProfileDto, updatedProfile);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async delete(id: number) {
    await this.__profileRepository.delete(id);
  }

  private async encryptPassword(password: string) {
    const salt = await genSalt(10);
    return await hash(password, salt);
  }
}
