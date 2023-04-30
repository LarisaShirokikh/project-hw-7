import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Blogs, BlogsDocument } from '../schemas/blogs.schema';
import { FilterQuery, Model } from 'mongoose';
import { BlogsExtendedType } from 'src/types/blogs.types';
import { UpdateBlogsDto } from '../dto/update.blogs.dto';

@Injectable()
export class BlogsRepository {
  constructor(
    @InjectModel(Blogs.name) private blogsModel: Model<BlogsDocument>,
  ) {}

  async getAllBloggers(
    searchNameTerm,
    pageNumber,
    pageSize,
    sortBy,
    sortDirection,
  ): Promise<BlogsExtendedType | undefined | null> {
    const blogs = await this.blogsModel
      .find({}, { _id: 0, password: 0, email: 0, isConfirmed: 0, __v: 0 })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .lean();

    const blogsCount = await this.blogsModel.count({});
    const pagesCount = Math.ceil(blogsCount / pageSize);

    const result = {
      pagesCount: pagesCount,
      page: pageNumber,
      pageSize,
      totalCount: blogsCount,
      items: blogs,
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return result;
  }

  async createBlogs(blogs: Blogs): Promise<Blogs> {
    const newBlogs = new this.blogsModel(blogs);
    return newBlogs.save();
  }

  async findOne(blogsId: string): Promise<BlogsDocument> {
    return this.blogsModel.findOne({ blogsId });
  }

  async findOneAndUpdate(
    blogsFilterQuery: FilterQuery<Blogs>,
    blogsUpdates: UpdateBlogsDto,
  ) {
    const blogsInstance = await this.blogsModel.findOneAndUpdate(blogsFilterQuery, blogsUpdates);
    if (!blogsInstance) return false
    await blogsInstance.save()
    return true
  }

  async findOneAndDelete(id: string) {

    const blogsInstance = this.blogsModel.findOne({id: id});
    if (!blogsInstance) return false
    await blogsInstance.deleteOne()
    return true
  }

  async getBlogsById(blogId: string): Promise<Blogs | null> {
    const blogger: Blogs | null = await this.blogsModel.findOne({id: blogId}, {_id: 0, __v: 0})
    return blogger;
}
}
