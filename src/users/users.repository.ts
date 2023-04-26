import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users, UsersDocument } from '../schemas/users.schema';
import {
  UsersEmailConfData,
  UsersEmailConfDataDocument,
} from '../schemas/UsersEmailConfData.schema';
import { UsersEmailConfDataType } from '../types/emailConfData.types';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../dto/create.users.dto';
import { UsersType } from '../types/users.types';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(Users.name) private usersModel: Model<UsersDocument>,
    @InjectModel(UsersEmailConfData.name)
    private usersEmailConfDataModel: Model<UsersEmailConfDataDocument>,
  ) {}

  async getAllUsers(
    pageNumber: number,
    pageSize: number,
    sortDirection: number,
    searchLoginTerm: string,
    searchEmailTerm: string,
  ) {
    const skip = pageSize * (pageNumber - 1);
    const filter = {};
    if (searchLoginTerm) {
      filter['login'] = { $regex: searchLoginTerm, $options: 'i' };
    }
    if (searchEmailTerm) {
      filter['email'] = { $regex: searchEmailTerm, $options: 'i' };
    }
    const users = await this.usersModel
      .find(filter)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      .sort({ createdAt: sortDirection })
      .skip(skip)
      .limit(pageSize)
      .exec();
    const totalCount = await this.usersModel.countDocuments(filter).exec();
    const pagesCount = Math.ceil(totalCount / pageSize);
    return {
      pagesCount,
      page: pageNumber,
      pageSize,
      totalCount,
      items: users,
    };
  }

  async createUser(user: UsersType) {
    console.log(user);
    await this.usersModel.insertMany([user]);
  }

  async findByLogin(login: string): Promise<Users | null> {
    return await this.usersModel.findOne({ login });
  }

  /* async saveUser(
    login: string,
    password: string,
    email: string,
  ): Promise<Users> {
    const createdUser = new this.usersModel({ login, password, email });
    return createdUser.save();
  }*/

  async deleteUsers(id: string) {
    const result = await this.usersModel.deleteOne({ id: id });
    return result.deletedCount === 1;
  }

  async insertDbUnconfirmedEmail(newUserEmail: UsersEmailConfDataType) {
    const insertDb = await this.usersEmailConfDataModel.create(newUserEmail);
    return insertDb.save();
  }
  /* async findUserByConfirmCode(confirmationCode: string) {
    const emailData = await this.usersEmailConfDataModel.findOne(
      { confirmationCode: confirmationCode },
      { _id: 0 },
    );
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const accountData = await this.usersModel.findOne(
      { email: emailData?.email },
      { _id: 0 },
    );

    if (emailData === null && accountData === null) {
      const user = {
        accountData: undefined,
        emailConfirmation: undefined,
      };
      return user;
    } else {
      const user = {
        accountData,
        emailConfirmation: emailData,
      };
      return user;
    }
  }*/
}
