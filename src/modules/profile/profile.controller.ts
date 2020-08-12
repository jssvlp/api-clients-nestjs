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
  async create(@Body() profile: ProfilePostDto): Promise<ProfileDto> {
    const createdProfile = this.__profileService.create(profile);

    return createdProfile;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @Put(':id')
  async update(@Param() id: number, @Body() profile: ProfilePostDto) {
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
