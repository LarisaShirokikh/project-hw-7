import mongoose, { HydratedDocument } from 'mongoose';

// export const UsersSchema = new mongoose.Schema<UsersType>({
//   accountData: {
//     id: String,
//     login: String,
//     email: String,
//     passwordHash: String,
//     isConfirmed: Boolean,
//     createdAt: Date,
//   },
//   emailConfirmation: {
//     email: String,
//     confirmationCode: String,
//     expirationDate: Date,
//     isConfirmed: Boolean,
//   },
// });

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false, id: false, versionKey: false })
export class AccountData {
  @Prop({ required: true, unique: true })
  login: string;
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true })
  passwordHash: string;
  @Prop({ required: true })
  isConfirmed: boolean;
  @Prop({ default: Date.now })
  createdAt: Date;
}

const AccountDataSchema = SchemaFactory.createForClass(AccountData);

@Schema({ _id: false, id: false, versionKey: false })
class EmailConfirmation {
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  confirmationCode: string;
  @Prop({ required: true })
  expirationDate: string;
  @Prop({ required: true })
  isConfirmed: boolean;
}

const EmailConfirmationSchema = SchemaFactory.createForClass(EmailConfirmation);

export type UsersDocument = Users & Document;

@Schema({ versionKey: false })
export class Users {
  @Prop({ required: true, unique: true })
  id: string;
  @Prop({ required: true, type: AccountDataSchema })
  accountData: AccountData;
  @Prop({ required: true, type: EmailConfirmationSchema })
  emailConfirmation: EmailConfirmation;
}
export const UsersSchema = SchemaFactory.createForClass(Users);

/*
export interface User {
  id: string;
  login: string;
  email: string;
  createdAt: Date;
}

@Schema()
export class UserNew extends Document {
  @Prop({ required: true })
  login: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserNew);
*/
