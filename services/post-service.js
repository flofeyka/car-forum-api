import Post from "../models/Post.js";
import PostDto from "../dtos/post-dto.js";
import ApiError from "../exceptions/api-error.js";

class postService {
    async createPost({title, content}, user_id) {
        const post = await Post.create({title, content, user: user_id});
        return new PostDto(post);
    }

    async updatePost({_id, title, content}) {
        return Post.updateOne({_id}, {title, content}, {new: true});
    }

    async deletePost(_id) {
        const deleteResult = await Post.deleteOne({_id});
        if (deleteResult.deletedCount !== 1) {
            throw ApiError.notFound("Post not found");
        }

        return {
            success: true, message: "Post deleted successfully",
        }
    }

    async getPost(_id) {
        const post = await Post.findOne({_id}).populate('user');
        if (!post) {
            throw ApiError.notFound('Post not found');
        }

        return new PostDto(post);
    }

    async getPosts() {
        const posts = await Post.find({}).populate('user');
        return posts.map(post => new PostDto(post));
    }
}

export default new postService();