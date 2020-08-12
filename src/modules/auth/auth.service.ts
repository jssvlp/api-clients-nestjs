import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthRepository } from './auth.respository';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto, SignInDto } from './dto';

import Profile from '../profile/profile.entity';
import { compare } from 'bcryptjs';
import { IJwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private readonly __authRepository: AuthRepository,
    private readonly __jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<void> {
    const { username, email } = signUpDto;

    const userProfileExists = await this.__authRepository.findOne({
      where: [{ username }, { email }],
    });

    if (userProfileExists) {
      throw new ConflictException('username or email already exist');
    }

    return this.__authRepository.singup(signUpDto);
  }

  async signIn(signInDto: SignInDto): Promise<{ token: string }> {
    const { username, password } = signInDto;

    const userProfile: Profile = await this.__authRepository.findOne({
      where: { username },
    });

    if (!userProfile) {
      throw new UnauthorizedException('invalid credentials');
    }

    const isMatch = await compare(password, userProfile.password);

    if (!isMatch) {
      throw new UnauthorizedException('invalid credentials');
    }

    const payload: IJwtPayload = {
      id: userProfile.id,
      email: userProfile.email,
      username: userProfile.username,
    };

    const token = await this.__jwtService.sign(payload);
    return { token };
  }
}
