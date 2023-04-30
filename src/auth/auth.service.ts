import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UsersRepository } from '../users/users.repository';
import { User } from '../schemas/users.schema';
import { EmailService } from '../maneger/email.service';
const bcrypt = require('bcryptjs');
import { v4 as uuidv4 } from "uuid";
import { add, addHours } from 'date-fns'
import { UsersEmailConfData } from 'src/schemas/UsersEmailConfData.schema';
import { randomUUID } from 'crypto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private usersRepository: UsersRepository,
    private emailService: EmailService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password): Promise<User> {
    const user = await this.usersRepository.findByEmail(username, password);
    if (!user) {
      return null;
    }

    const isPasswordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordMatch) {
      return null;
    }

    return user;
  }

  async registerUser(login: string, email: string, password: string) {
    const user = await this.usersRepository.findByEmail(login, email);
    if (user) {
      throw new Error('User with this email alredy exsist');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = {
      id: uuidv4(),
      email,
      login,
      passwordHash,
      createdAt: new Date().toISOString()
    };
     await this.usersRepository.createUser(newUser);
     const emailInfo: UsersEmailConfData = {
      email,
      confirmationCode: randomUUID(),
      expirationDate: addHours(new Date(), 3).toISOString(),
      isConfirmed: false
     }
      await this.usersRepository.insertDbUnconfirmedEmail(emailInfo);
     await this.emailService.sendConfirmationEmail(email, emailInfo.confirmationCode)
     return newUser
    
  }

  async checkCredentials(loginOrEmail: string, password: string) {
    const user = await this.usersRepository.findByLoginOrEmail(loginOrEmail);
    console.log(user)
    if (!user) return null;
    try {
    const validPassword = await bcrypt.compare(password, user.passwordHash)
    console.log(validPassword)
    if (validPassword) return user
    } catch (e) {
    return false
    }
    }

  


  async getCurrentUser(userId: string): Promise<User> {
    return this.usersRepository.findUserByUserId(userId)
  }

  async findUserById(userId: string): Promise<User | undefined | null> {
    const user = await this.usersRepository.findUserByUserId(userId)
    return user
  }
}
