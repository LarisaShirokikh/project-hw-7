import { Controller, Delete } from "@nestjs/common";
import { BlogsRepository } from "src/blogs/blogs.repository";
import { PostsRepository } from "src/posts/posts.repository";
import { UsersRepository } from "src/users/users.repository";

@Controller('testings')
export class TestingController {
    constructor(
                protected postsRepository: PostsRepository,
                protected blogsRepository: BlogsRepository,
                protected usersRepository: UsersRepository,

) {}

@Delete('all-data')
async deleteAll() {
    await this.blogsRepository.deleteAll();
    await this.postsRepository.deleteAll();
    await this.usersRepository.deleteAll();
    
    return "All data deleted";
}
}