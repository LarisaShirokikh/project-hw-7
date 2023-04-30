import { IsString, MinLength } from 'class-validator';
import { CreateUserDto } from './create.users.dto';

export class CreateUserWithPasswordDto extends CreateUserDto {
  @IsString()
  @MinLength(8)
  password: string;
}
