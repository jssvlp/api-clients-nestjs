import { IsNumber, IsString, MaxLength } from 'class-validator';
import { Expose, Exclude } from 'class-transformer';

@Exclude()
export class ReadProfileDto {
  @IsNumber()
  @Expose()
  readonly id: number;

  @IsString()
  @Expose()
  @MaxLength(100, { message: 'field length invalid' })
  readonly email: string;

  @IsString()
  @Expose()
  @MaxLength(100, { message: 'field length invalid' })
  readonly username: string;
}
