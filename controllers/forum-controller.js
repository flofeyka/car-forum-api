import forumService from "../services/forum-service.js";

class forumController {
    async getForums(req, res, next) {
        try {
            const result = await forumService.getForums();
            return res.json(result);
        } catch (e) {
            next(e);
        }
    }

    async deleteForum(req, res, next) {
        try {
            const result = await forumService.deleteForum(req.params.id);
            return res.json(result);
        } catch (e) {
            next(e)
        }
    }

    async updateForum(req, res, next) {
        try {
            const result = await forumService.updateForum(req.params.id, req.body);
            return res.json(result);
        } catch (e) {
            next(e);
        }
    }

    async createForum(req, res, next) {
        try {
            const result = await forumService.createForum(req.user.id, req.body);
            return res.json(result);
        } catch (e) {
            next(e);
        }
    }

    async getForumById(req, res, next) {
        try {
            const result = await forumService.getForumById(req.params.id);
            return res.json(result);
        } catch (e) {
            next(e);
        }
    }
}

export default new forumController();