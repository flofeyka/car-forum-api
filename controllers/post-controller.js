import postService from "../services/post-service.js";

class postController {
    async createPost(req, res, next) {
        try {
            const result = await postService.createPost(req.body, req.user.id);
            return res.json(result);
        } catch(e) {
            next(e);
        }
    }

    async updatePost(req, res, next) {
        try {
            const result = await postService.updatePost(req.body);
            return res.json(result);
        } catch(e) {
            next(e);
        }
    }

    async deletePost(req, res, next) {
        try {
            const result = await postService.deletePost(req.params.id);
            return res.json(result);
        } catch(e) {
            next(e);
        }
    }

    async getPost(req, res, next) {
        try {
            const result = await postService.getPost(req.params.id);
            return res.json(result);
        } catch(e) {
            next(e);
        }
    }

    async getPosts(req, res, next) {
        try {
            const result = await postService.getPosts();
            return res.json(result);
        } catch(e) {
            next(e);
        }
    }
};

export default new postController();