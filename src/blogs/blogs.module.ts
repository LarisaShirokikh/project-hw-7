import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { Blogs, BlogsSchema } from '../schemas/blogs.schema';
import { BlogsRepository } from './blogs.repository';

import { Posts, PostsSchema } from 'src/schemas/posts.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Blogs.name, schema: BlogsSchema },
      { name: Posts.name, schema: PostsSchema}]),
  ],
  controllers: [BlogsController],
  providers: [BlogsService, BlogsRepository
],
  exports: [BlogsService, BlogsRepository],
})
export class BlogsModule {}
