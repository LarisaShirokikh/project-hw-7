import { BadRequestException, Injectable, Post } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UsersType } from '../types/users.types';

import { add } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import { UsersRepository } from '../users/users.repository';
import { EmailManager } from '../maneger/email.maneger';
const bcrypt = require('bcryptjs');

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private usersRepository: UsersRepository,
    private emailManager: EmailManager,
  ) {}

  async userRegistration(login: string, email: string, password: string) {
    try {
      const salt = bcrypt.genSaltSync(10);
      const passwordHash = bcrypt.hashSync(password, salt);
      const newUser: UsersType = {
        accountData: {
          id: uuidv4(),
          login,
          email,
          passwordHash,
          isConfirmed: false,
          createdAt: new Date(),
        },
        emailConfirmation: {
          email,
          confirmationCode: uuidv4(),
          expirationDate: add(new Date(), { hours: 3 }),
          isConfirmed: false,
        },
      };
      await this.usersRepository.createUser(newUser);
      console.log('0000');
      await this.usersRepository.insertDbUnconfirmedEmail(
        newUser.emailConfirmation,
      );
      console.log(12345);
      await this.emailManager.sendEmailConfirmationCode(
        newUser.emailConfirmation.confirmationCode,
        email,
      );
      return newUser;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
