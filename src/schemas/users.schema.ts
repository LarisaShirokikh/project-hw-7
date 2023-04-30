
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true, unique: true })
  login: string;

  @Prop({ required: true, unique: true  })
  email: string;

  @Prop({ required: true })
  passwordHash: string;


  @Prop({ required: true })
  createdAt: string;
  static schema: any;
}

export const UserSchema = SchemaFactory.createForClass(User);
