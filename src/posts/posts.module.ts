
import { PostsService } from "./posts.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";
import { PostsController } from "./posts.controller";
import { PostsRepository } from "./posts.repository";
import { Posts, PostsSchema } from "src/schemas/posts.schema";
import { BlogsRepository } from "src/blogs/blogs.repository";
import { BlogsService } from "src/blogs/blogs.service";




@Module({
    imports: [ 
      MongooseModule.forFeature([
        { name: Posts.name, schema: PostsSchema}]),
  
  ], 
    controllers: [PostsController],
    providers: [
      PostsService, 
      PostsRepository, 
      BlogsRepository,
      BlogsService,
    ],
    exports: [PostsService, PostsRepository,  BlogsRepository,
      BlogsService,]
    })
  export class PostModule {}
  