import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { Blogs, BlogsSchema } from '../schemas/blogs.schema';
import { BlogsRepository } from './blogs.repository';
import { PostModule } from 'src/posts/posts.module';
import { PostsRepository } from 'src/posts/posts.repository';
import { PostsService } from 'src/posts/posts.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Blogs.name, schema: BlogsSchema }]),
   
  ],
  controllers: [BlogsController],
  providers: [BlogsService, BlogsRepository,
  PostsRepository, PostsService],
  exports: [BlogsService, BlogsRepository,
    PostsRepository, PostsService],
})
export class BlogsModule {}
