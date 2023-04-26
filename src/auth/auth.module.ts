import { Users, UsersSchema } from '../schemas/users.schema';
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
import { EmailManager } from '../maneger/email.maneger';
import { EmailAdapter } from '../maneger/email.adapter';

const models = [
  { name: Users.name, schema: UsersSchema },
  { name: UsersEmailConfData.name, schema: UsersEmailConfDataSchema },
];

@Module({
  imports: [MongooseModule.forFeature(models)],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    UsersRepository,
    EmailManager,
    EmailAdapter,
  ],
  exports: [AuthService],
})
export class AuthModule {}
