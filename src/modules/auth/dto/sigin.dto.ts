import { IsNotEmpty, IsString } from 'class-validator';
export class SignInDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  password: string;

  @IsNotEmpty()
  @IsString()
  username: string;
}
