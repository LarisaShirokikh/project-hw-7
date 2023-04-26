import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { Users, UsersSchema } from '../schemas/users.schema';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import {
  UsersEmailConfData,
  UsersEmailConfDataSchema,
} from '../schemas/UsersEmailConfData.schema';
import { EmailManager } from '../maneger/email.maneger';
import { EmailAdapter } from '../maneger/email.adapter';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Users.name, schema: UsersSchema },
      { name: UsersEmailConfData.name, schema: UsersEmailConfDataSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository,
    EmailManager,
    EmailAdapter,
    AuthService,
  ],
  //exports: [UsersService, UsersRepository],
})
export class UsersModule {}
