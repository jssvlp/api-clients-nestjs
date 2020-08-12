import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from 'src/config/config.service';
import { Configuration } from 'src/config/config.keys';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from '../auth.respository';
import { IJwtPayload } from '../jwt-payload.interface';
import { UnauthorizedException, Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategie extends PassportStrategy(Strategy) {
  constructor(
    private readonly __configService: ConfigService,
    @InjectRepository(AuthRepository)
    private readonly __authRepository: AuthRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: __configService.get(Configuration.JWT_SECRET),
    });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async validate(payload: IJwtPayload) {
    const { username } = payload;

    const user = await this.__authRepository.findOne({
      where: { username, status: 'active' },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return payload;
  }
}
