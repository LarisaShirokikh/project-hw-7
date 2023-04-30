import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Posts, PostsDocument } from "src/schemas/posts.schema";
import { PostsOfBloggerType, PostsType } from "src/types/posts.types";

@Injectable()
export class PostsRepository {
    constructor(
        @InjectModel(Posts.name) private postsModel: Model<PostsDocument>,
    ) {}

    
async getAllPosts (
    pageNumber: number, 
    pageSize: number, 
    userId: string): Promise<PostsOfBloggerType | undefined | null>{
const postCount = await this.postsModel.count({})
const pagesCount = Math.ceil(postCount / pageSize)

const posts = await this.postsModel.find({}, {_id: 0, __v: 0})
.skip((pageNumber - 1) * pageSize).limit(pageSize).lean()

const allPosts = {
    pagesCount: pagesCount,
    page: pageNumber,
    pageSize,
    totalCount: postCount,
    items: posts
}
//@ts-ignore
return allPosts
}

async createPost(newPosts: PostsType) {
    const post = await this.postsModel.insertMany({...newPosts})
    return post;
}
 async getPostById(id: string) {
    const post = await this.postsModel.findById(id)
    return post;

    }

    async updatePost(post: PostsType) {
        const updatedPost = await this.postsModel.findByIdAndUpdate( {...post})
        return updatedPost;
    }
    async deletePost(id: string) {
        const deletedPost = await this.postsModel.findByIdAndDelete(id)
        return deletedPost;
    }

    async deleteAll() {
        return this.postsModel.deleteMany({})
    }
}
