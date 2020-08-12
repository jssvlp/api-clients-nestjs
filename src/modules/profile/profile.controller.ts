import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ReadProfileDto, CreateProfileDto } from './dtos';
import Profile from './profile.entity';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly __profileService: ProfileService) {}

  @Get(':id')
  async getProfile(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ReadProfileDto> {
    const profile: ReadProfileDto = await this.__profileService.get(id);

    return profile;
  }

  @Get()
  getProfiles(): Promise<ReadProfileDto[]> {
    const profiles = this.__profileService.getAll();

    return profiles;
  }

  @Post()
  async create(
    @Body() profile: Partial<CreateProfileDto>,
  ): Promise<ReadProfileDto> {
    const createdProfile = this.__profileService.create(profile);

    return createdProfile;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @Put(':id')
  async update(
    @Param() id: number,
    @Body() profile: Profile,
  ): Promise<ReadProfileDto> {
    const updatedProfile = await this.__profileService.update(id, profile);

    return updatedProfile;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.__profileService.delete(id);

    return { statusCode: 200, message: 'resource deleted correctly' };
  }
}
