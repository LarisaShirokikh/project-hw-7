import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { Blogs } from '../schemas/blogs.schema';
import { CreateBlogsDto } from '../dto/create.blogs.dto';
import { UpdateBlogsDto } from '../dto/update.blogs.dto';

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
    const blogs = this.blogsService.getBlogsById(blogsId);
    return blogs
  }

  @Patch(':blogsId')
  update(
    @Param('blogsId') blogsId: string,
    @Body() updateBloggersDto: UpdateBlogsDto,
  ) {
    return this.blogsService.updateBlogs(blogsId, updateBloggersDto);
  }

  @Delete(':blogsId')
  remove(@Param('blogsId') blogsId) {
    const isDeleted = this.blogsService.deleteBlogs(blogsId);
    if (isDeleted) {
      return true
    }
    return false
  }

  
}
