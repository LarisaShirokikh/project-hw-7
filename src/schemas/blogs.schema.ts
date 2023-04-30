import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type BlogsDocument = Blogs & Document;

@Schema()
export class Blogs {
  @Prop()
  id: string;
  @Prop()
  name: string;
  @Prop()
  description: string;
  @Prop()
  websiteUrl: string;
  @Prop()
  createdAt: string;
  @Prop()
  isMembership: true;
  static schema: any;
}

export const BlogsSchema = SchemaFactory.createForClass(Blogs);
