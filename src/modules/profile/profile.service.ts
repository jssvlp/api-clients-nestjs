import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ProfileRepository } from './profile.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { MapperService } from 'src/shared/mapper.service';
import { ProfileDto } from './dto/profile.dto';
import Profile from './profile.entity';
import { getConnection } from 'typeorm';
import { Client } from '../client/client.entity';
import { ProfilePostDto } from './dto/profile.post.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileRepository)
    private readonly __profileRepository: ProfileRepository,
    private readonly __mapperService: MapperService,
  ) {}

  async get(id: number): Promise<ProfileDto> {
    if (!id) {
      throw new BadRequestException('id must be sent');
    }

    const profile = await this.__profileRepository.findOne(id);

    return this.__mapperService.map<Profile, ProfileDto>(
      profile,
      new ProfileDto(),
    );
  }

  async getAll(): Promise<ProfileDto[]> {
    const profiles: Profile[] = await this.__profileRepository.find();

    return this.__mapperService.mapCollection<Profile, ProfileDto>(
      profiles,
      new ProfileDto(),
    );
  }

  async create(profile: ProfilePostDto): Promise<Profile> {
    const clientRepo = await getConnection().getRepository(Client);
    const client = await clientRepo.findOne(profile.clientId);

    if (!client) {
      throw new NotFoundException('client does not exist');
    }
    const profileCreated = await this.__profileRepository.create(profile);

    client.profile = profileCreated;
    clientRepo.save(client);

    return profileCreated;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types

  async update(id: number, profile: ProfilePostDto) {
    await this.__profileRepository.update(id, profile);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types

  async delete(id: number) {
    await this.__profileRepository.delete(id);
  }
}
