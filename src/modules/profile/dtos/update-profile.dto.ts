import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
@Exclude()
export class UpdateProfileDto {
  @IsString()
  @Expose()
  @MaxLength(100, { message: 'field length invalid' })
  readonly email: string;

  @IsString()
  @Expose()
  @MaxLength(100, { message: 'field length invalid' })
  readonly username: string;

  @Expose()
  @IsNotEmpty()
  readonly clientId: number;

  @Expose()
  @IsString()
  @MaxLength(50, { message: 'field length invalid' })
  readonly password: string;
}
