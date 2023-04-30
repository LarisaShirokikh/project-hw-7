import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { User, UserSchema } from '../schemas/users.schema';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import {
  UsersEmailConfData,
  UsersEmailConfDataSchema,
} from '../schemas/UsersEmailConfData.schema';
import { AuthService } from '../auth/auth.service';
import { EmailService } from 'src/maneger/email.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: UsersEmailConfData.name, schema: UsersEmailConfDataSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository,
    AuthService,
    EmailService,
    JwtService,
  ],
  //exports: [UsersService, UsersRepository],
})
export class UsersModule {}
