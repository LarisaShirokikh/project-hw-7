import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { Blogs } from './blogs.schema';
import { CreateBlogsDto } from './dto/create.blogs.dto';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Get()
  async findAll(
    @Query()
    query: {
      searchNameTerm: string;
      pageNumber: string;
      pageSize: string;
      sortBy: string;
      sortDirection: string;
    },
  ): Promise<Blogs[]> {
    const blogs = await this.blogsService.getAllBlogs(
      query.searchNameTerm,
      query.pageNumber,
      query.pageSize,
      query.sortBy,
      query.sortDirection,
    );

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return blogs;
  }

  @Post()
  async createBlog(@Body() createBlogsDto: CreateBlogsDto): Promise<Blogs> {
    return await this.blogsService.createBlogs(
      createBlogsDto.name,
      createBlogsDto.description,
      createBlogsDto.websiteUrl,
    );
  }

  @Get(':blogsId')
  findOne(@Param('BlogsId') blogsId: string): Promise<Blogs> {
    return this.blogsService.getBlogsById(blogsId);
  }
}
