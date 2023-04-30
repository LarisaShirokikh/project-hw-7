import { Controller, Get, Query, Headers, Res, Body, Post, HttpCode, HttpStatus } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { JwtService } from "src/auth/jwt.service";

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService,
    private jwtService: JwtService) {}

  @Get()
  async getAllPost(
    @Headers('Authorization') authorization: string,
    @Query('PageNumber') pageNumber: number, 
    @Query ('PageSize') pageSize: number, 
     ) {

        let userId = '';
        if(authorization) {
            const token = authorization.split(' ')[1];
            userId = await this.jwtService.getUserIdByToken(token);
            //@ts-ignore
            const posts = await this.postsService.getAllPosts(pageNumber,pageSize, userId)
            return posts
        }
  }
  
  @Post()
  @HttpCode(HttpStatus.OK)
  async createPost(
    @Body() body: { title: string; shortDescription: string; content: string; blogId: string }) {
const post = await this.postsService
.createPost(body.title, body.shortDescription, body.content, body.blogId)
if(!post) return
return post
  }

  //@Get()
}