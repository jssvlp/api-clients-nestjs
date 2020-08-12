import { IsNotEmpty, IsString, MaxLength, IsNumber } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UpdateClientDto {
  @Expose()
  readonly id: string;

  @Expose()
  readonly name: string;

  @Expose()
  readonly firstLastName: string;

  @Expose()
  readonly secondLastName: string;

  @Expose()
  readonly birthDate: Date;

  @Expose()
  readonly gender: string;

  @Expose()
  readonly birthPlace: string;
}
