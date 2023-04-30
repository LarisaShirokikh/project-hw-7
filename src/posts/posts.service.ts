import { Injectable } from "@nestjs/common";
import { PostsRepository } from "./posts.repository";
import { ObjectId } from "typeorm";
import { PostsType } from "src/types/posts.types";
import { BlogsRepository } from "src/blogs/blogs.repository";

@Injectable()
export class PostsService {
  constructor(private postsRepository: PostsRepository,
    private blogsRepository: BlogsRepository) {}

  async getAllPosts(pageNumber: string = "1" || undefined || null, pageSize: string = "10" || undefined || null, userId: string): Promise<{}> {
    const postsDb = await this.postsRepository
        .getAllPosts(+pageNumber, +pageSize, userId)
    const posts = {...postsDb}
    return posts
}
async createPost(title: string, shortDescription: string, content: string, blogId: string): Promise<PostsType | undefined> {
    const blogger = await this.blogsRepository.getBlogsById(blogId)

    if (blogger) {
        const newPost = {
            id: (new ObjectId()).toString(),
            title,
            shortDescription,
            content,
            blogId,
            bloggerName: blogger.name,
            addedAt: new Date,
            extendedLikesInfo: {
                likesCount: 0,
                dislikesCount: 0,
                myStatus: "None",
                newestLikes: []
            }
        }
// @ts-ignore
        const createdPost = await this.postsRepository.createPost(newPost)
        // @ts-ignore
        return createdPost
    }
}
}