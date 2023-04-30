import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../dto/create.users.dto';
import { log } from 'console';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/schemas/users.schema';
import { JwtAuthGuard } from './guards/jwt.auth.guard';
import { JwtService } from './jwt.service';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private jwtService: JwtService,
    private userService: UsersService) {}

  

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('registration')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    try {
    await this.authService.registerUser(createUserDto.login, createUserDto.email, createUserDto.password);
    return {
      message:
        'User registered successfully. Please check your email to confirm your account.',
    };
    
  } catch (e) {
    log(e)
  }
}

@Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body('login') login: string,
    @Body('password') password: string,
  ) {
    const user = await this.authService.checkCredentials(login, password)
    if (!user) return null
  const jwtTokenPair = await this.jwtService.createJwtPair(user)
  console.log(jwtTokenPair)
  //cookie('refreshToken', jwtTokenPair.refreshToken, {httpOnly: true, secure: true})
    return ({ accessToken: jwtTokenPair.accessToken });
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async aboutMe(@Req() req) {
    const header = req.headers.authorization
    if (!header) return  
    console.log(header)
    const token = header!.split('')[1]
    const userId = await this.jwtService.getUserIdByToken(token)
    const user = await this.authService.findUserById(userId)
    if (user) {
      return {
        email: user.email,
        login: user.login,
        userId: user.id
      }
    }
    return
  }

}

