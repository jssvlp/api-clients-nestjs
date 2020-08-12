import { IsNotEmpty } from 'class-validator';
import { Client } from 'src/modules/client/client.entity';

export class ProfileDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  picture: string;

  @IsNotEmpty()
  clientId: number;
}
