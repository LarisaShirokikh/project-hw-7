import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type PostsDocument = Posts & Document;

@Schema()
export class Posts {
    @Prop({ required: true, unique: true })
    id: string;

    @Prop({ required: true, unique: true })
    title: string;

    @Prop({ required: true })
    shotDescription: string;

    @Prop({ required: true })
    content: string;

    @Prop({ required: true })
    blogId: string;

    @Prop({ required: true })
    blogName: string;

    @Prop({ required: true })
    createdAt: string

}
export const PostsSchema = SchemaFactory.createForClass(Posts);