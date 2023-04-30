import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository,
    private jwtService: JwtService) {}

  /* async createUser(
    login: string,
    password: string,
    email: string,
  ): Promise<Users> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return this.usersRepository.createUser({
      id: uuidv4(),
      login: login,
      password: hashedPassword,
      email,
      createdAt: new Date(),
    });
  }*/

  /*async deleteUser(id: string): Promise<UsersType> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const deleteUser = await this.usersModel.findOneAndDelete(id).exec();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return deleteUser;
  }*/

  async getUsers(
    pageNumber: number,
    pageSize: number,
    sortDirection: number,
    searchLoginTerm: string,
    searchEmailTerm: string,
  ) {
    return this.usersRepository.getAllUsers(
      pageNumber,
      pageSize,
      sortDirection,
      searchLoginTerm,
      searchEmailTerm,
    );
  }

  // async getAllUsers(
  //   searchLoginTerm: string,
  //   searchEmailTerm: string,
  //   pageNumber: number,
  //   pageSize: number,
  //   sortBy: string,
  //   sortDirection: string,
  // ) {
  //   return await this.usersRepository.getAllUsers(
  //     searchLoginTerm,
  //     searchEmailTerm,
  //     pageNumber,
  //     pageSize,
  //     sortBy,
  //     sortDirection,
  //   );
  // }
  async login(loginOrEmail: string, password: string): Promise<string> {
    const user = await this.usersRepository.findByLoginOrEmail(loginOrEmail);
    if (!user || user.passwordHash !== password) {
      throw new Error('Invalid login or password');
    }
    const payload = { loginOrEmail: user.login };
    return this.jwtService.sign(payload);
  }
}
