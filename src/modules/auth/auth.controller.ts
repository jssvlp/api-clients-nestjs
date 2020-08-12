import {
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
} from '@nestjs/common';
import { SignInDto, SignUpDto } from './dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly __authService: AuthService) {}

  @Post('signup')
  @UsePipes(ValidationPipe)
  async sigup(@Body() signupDto: SignUpDto): Promise<void> {
    return this.__authService.signUp(signupDto);
  }

  @Post('signin')
  async sigin(@Body() signinDto: SignInDto): Promise<{ token }> {
    return this.__authService.signIn(signinDto);
  }
}
