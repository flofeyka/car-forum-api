import userService from "../services/user-service.js";

class userController {
    async editUser(req, res, next) {
        try {
            const result = await userService.editUser(req.user.id, req.body);
            return res.json(result);
        } catch (e) {
            next(e)
        }
    }

    async getUserById(req, res, next) {
        try {
            const result = await userService.getUserById(req.user.id);
            return res.json(result);
        } catch(e) {
            next(e);
        }
    }
}

export default new userController();