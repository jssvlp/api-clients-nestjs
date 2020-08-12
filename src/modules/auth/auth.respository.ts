import { Repository, EntityRepository } from 'typeorm';

import Profile from '../profile/profile.entity';
import { SignUpDto } from './dto';
import { getSalt, hash } from 'bcryptjs';

@EntityRepository(Profile)
export class AuthRepository extends Repository<Profile> {
  async singup(signUpDto: SignUpDto) {
    const { email, username, password } = signUpDto;

    const userProfile = new Profile();

    userProfile.username = username;
    userProfile.email = email;

    const salt = await getSalt('10');

    userProfile.password = await hash(password, salt);

    await userProfile.save();
  }
}
