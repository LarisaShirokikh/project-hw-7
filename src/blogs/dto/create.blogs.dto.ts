import { IsString, Length } from 'class-validator';

export class CreateBlogsDto {
  @IsString()
  @Length(3, 100)
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly websiteUrl: string;
  readonly createdAt: string;
  readonly isMembership: boolean;
}
