import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UsersEmailConfDataDocument = HydratedDocument<UsersEmailConfData>;

@Schema({ id: false, versionKey: false })

export class UsersEmailConfData {

  @Prop({ required: true, unique: true  })
  email: string;
  @Prop({ type: String, required: true })
  confirmationCode: string;
  @Prop({ type: String, required: true })
  expirationDate: string;
  @Prop({ type: Boolean, required: true })
  isConfirmed: boolean;
}

export const UsersEmailConfDataSchema =
  SchemaFactory.createForClass(UsersEmailConfData);
