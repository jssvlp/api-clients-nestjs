import { Injectable } from '@nestjs/common';
import { TypeMapper } from 'ts-mapper';
import { ProfileDto } from 'src/modules/profile/dto/profile.dto';
import Profile from 'src/modules/profile/profile.entity';

@Injectable()
export class MapperService extends TypeMapper {
  constructor() {
    super();
    this.config();
  }

  private config(): void {
    this.createMap<Profile, ProfileDto>();
  }
}
