import { IsNotEmpty } from 'class-validator';
import bcryptjs from 'bcryptjs';

export class ProfilePostDto {
  constructor(private readonly bycript: bcryptjs) {}
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  picture: string;

  @IsNotEmpty()
  clientId: number;

  @IsNotEmpty({})
  password: string;

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  encryptPassword(password: string) {
    this.bycript.genSalt(10, function(err, password) {
      this.bcrypt.hash('B4c0//', password, function(err, hash) {
        return hash;
      });
    });
  }
}
