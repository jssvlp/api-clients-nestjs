import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileDto } from './dto/profile.dto';
import { ProfilePostDto } from './dto/profile.post.dto';
import Profile from './profile.entity';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly __profileService: ProfileService) {}

  @Get(':id')
  async getProfile(@Param() id: number): Promise<ProfileDto> {
    const profile = this.__profileService.get(id);

    return profile;
  }

  @Get()
  async getProfiles(): Promise<ProfileDto[]> {
    const profiles = this.__profileService.getAll();

    return profiles;
  }

  @Post()
  async create(@Body() profile: Profile): Promise<Profile> {
    const createdProfile = this.__profileService.create(profile);

    return createdProfile;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @Put(':id')
  async update(@Param() id: number, @Body() profile: Profile) {
    const updatedProfile = await this.__profileService.update(id, profile);

    return true;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.__profileService.delete(id);

    return true;
  }
}
