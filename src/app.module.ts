import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestingController } from './testing/testing.controller';
import { BlogsController } from './blogs/blogs.controller';
import { UsersController } from './users/users.controller';
import { AuthController } from './auth/auth.controller';
import { PostsController } from './posts/posts.controller';
import { BlogsService } from './blogs/blogs.service';
import { UsersService } from './users/users.service';
import { PostsService } from './posts/posts.service';
import { JwtService } from './auth/jwt.service';
import { AuthService } from './auth/auth.service';
import { BlogsRepository } from './blogs/blogs.repository';
import { UsersRepository } from './users/users.repository';
import { PostsRepository } from './posts/posts.repository';
import { EmailService } from './maneger/email.service';
import { Blogs, BlogsSchema } from './schemas/blogs.schema';
import { User, UserSchema } from './schemas/users.schema';
import { Posts, PostsSchema } from './schemas/posts.schema';
import { UsersEmailConfData, UsersEmailConfDataSchema } from './schemas/UsersEmailConfData.schema';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    MongooseModule.forRoot(process.env.MONGO_URL),

    MongooseModule.forFeature([{name: Blogs.name, schema: BlogsSchema},
       {name: User.name, schema: UserSchema}, {name: Posts.name, schema: PostsSchema},
        {name: UsersEmailConfData.name, schema: UsersEmailConfDataSchema}]),
    
  ],

  controllers: [AppController, TestingController, BlogsController, UsersController, AuthController,PostsController],
  providers: [AppService, BlogsService, UsersService, EmailService,
    PostsService, JwtService, AuthService, BlogsRepository, UsersRepository, PostsRepository],
})
export class AppModule {}
