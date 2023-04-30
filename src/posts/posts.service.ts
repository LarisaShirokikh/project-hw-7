import { Injectable } from "@nestjs/common";
import { PostsRepository } from "./posts.repository";
import { ObjectId } from "typeorm";
import { PostsType } from "src/types/posts.types";
import { BlogsRepository } from "src/blogs/blogs.repository";
import { log } from "console";

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
console.log(blogger)
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
async getPostById(id: string): Promise<PostsType | undefined> {
    const post = await this.postsRepository.getPostById(id)
    //@ts-ignore
    return post
}

async updatePost(id: string, title: string, shortDescription: string, content: string){
    const post = await this.postsRepository.getPostById(id)
    post.title = title
    post.shortDescription = shortDescription
    post.content = content
    const updatedPost = await this.postsRepository.updatePost(post)
    return updatedPost
}
async deletePost(id: string){
    await this.postsRepository.getPostById(id)
    const deletedPost = await this.postsRepository.deletePost(id)
    return deletedPost
}
}