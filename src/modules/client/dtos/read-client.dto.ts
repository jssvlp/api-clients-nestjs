import { IsNotEmpty, IsString, MaxLength, IsNumber } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { ReadProfileDto } from '../../profile/dtos';
import { Address } from 'cluster';

@Exclude()
export class ReadClientDto {
  @Expose()
  readonly id: string;

  @Expose()
  readonly name: string;

  @Expose()
  readonly firstLastName: string;

  @Expose()
  readonly secondLastName: string;

  @Expose()
  readonly birthDate: string;

  @Expose()
  readonly gender: string;

  @Expose()
  readonly birthPlace: string;

  @Expose()
  profile: ReadProfileDto;

  @Expose()
  addresses: Address[];
}
