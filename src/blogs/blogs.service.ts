import { Injectable } from '@nestjs/common';
import { BlogsRepository } from './blogs.repository';
import { BlogsExtendedType } from 'src/types/blogs.types';
import { Blogs } from './blogs.schema';
import { v4 as uuidv4 } from 'uuid';
import { UpdateBlogsDto } from './dto/update.blogs.dto';

@Injectable()
export class BlogsService {
  constructor(private readonly blogsRepository: BlogsRepository) {}

  async getAllBlogs(
    searchNameTerm: string = null || undefined,
    pageNumber: string = '1' || undefined,
    pageSize: string = '10' || undefined,
    sortBy: string = 'createdAt' || undefined,
    sortDirection = 'desc',
  ): Promise<BlogsExtendedType> {
    return this.blogsRepository.getAllBloggers(
      searchNameTerm,
      +pageNumber,
      +pageSize,
      sortBy,
      sortDirection,
    );
  }

  async createBlogs(
    name: string,
    description: string,
    websiteUrl: string,
  ): Promise<Blogs> {
    return this.blogsRepository.createBlogs({
      id: uuidv4(),
      name,
      description,
      websiteUrl,
      createdAt: new Date().toString(),
      isMembership: true,
    });
  }
  async getBlogsById(blogsId: string): Promise<Blogs> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return this.blogsRepository.findOne({ blogsId });
  }

  async updateBlogs(
    blogsId: string,
    blogsUpdates: UpdateBlogsDto,
  ): Promise<Blogs> {
    return this.blogsRepository.findOneAndUpdate({ blogsId }, blogsUpdates);
  }
}
