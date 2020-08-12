import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileRepository } from './profile.repository';
import { SharedModule } from 'src/shared/shared.module';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileRepository]), SharedModule],
  providers: [ProfileService],
  exports: [TypeOrmModule],
  controllers: [ProfileController],
})
export class ProfileModule {}
