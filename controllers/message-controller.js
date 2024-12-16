import messageService from "../services/message-service.js";

class messageController {
    async sendMessage(req, res, next) {
        try {
            const result = await messageService.createMessage(req.params.id, req.body.message, req.user.id);
            return res.json(result);
        } catch (e) {
            next(e);
        }
    }

    async deleteMessage(req, res, next) {
        try {
            const result = await messageService.deleteMessage(req.params.id);
            return res.json(result);
        } catch (e) {
            next(e);
        }
    }

    async updateMessage(req, res, next) {
        try {
            const result = await messageService.updateMessage(req.params.id, req.body.message);
            return res.json(result);
        } catch (e) {
            next(e);
        }
    }
}

export default new messageController();