import { User, UserSchema } from '../schemas/users.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { UsersRepository } from '../users/users.repository';
import { AuthController } from './auth.controller';
import {
  UsersEmailConfData,
  UsersEmailConfDataSchema,
} from '../schemas/UsersEmailConfData.schema';
import { EmailService } from '../maneger/email.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtService } from './jwt.service';
import { PostsService } from 'src/posts/posts.service';
import { PostsRepository } from 'src/posts/posts.repository';

const models = [
  { name: User.name, schema: UserSchema },
  { name: UsersEmailConfData.name, schema: UsersEmailConfDataSchema },
];

@Module({
  imports: [MongooseModule.forFeature(models), 
    PassportModule, 
    JwtModule
    .register({secret: jwtConstants.secret, signOptions: { expiresIn: '60m'}})],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    UsersRepository,
    EmailService,
    JwtStrategy,
    JwtService,
    PostsService,
    PostsRepository
  ],
  exports: [AuthService, EmailService],
})
export class AuthModule {}
