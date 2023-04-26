import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistrationDto } from '../dto/registration.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/registration')
  async registration(@Body() registrationDto: RegistrationDto) {
    return this.authService.userRegistration(
      registrationDto.login,
      registrationDto.email,
      registrationDto.password,
    );
  }
}
