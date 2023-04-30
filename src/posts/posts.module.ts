
import { PostsService } from "./posts.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";
import { PostsController } from "./posts.controller";
import { PostsRepository } from "./posts.repository";
import { Posts, PostsSchema } from "src/schemas/posts.schema";
import { BlogsRepository } from "src/blogs/blogs.repository";
import { BlogsService } from "src/blogs/blogs.service";
import { Blogs, BlogsSchema } from "src/schemas/blogs.schema";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { jwtConstants } from "src/auth/constants";
import { AuthModule } from "src/auth/auth.module";




@Module({
    imports: [ 
      MongooseModule.forFeature([
        { name: Posts.name, schema: PostsSchema},
        { name: Blogs.name, schema: BlogsSchema }]),
        AuthModule
      ],
  
  
    controllers: [PostsController],
    providers: [
      PostsService, 
      PostsRepository
    ],
    exports: [PostsService, PostsRepository]
    })
  export class PostModule {}
  