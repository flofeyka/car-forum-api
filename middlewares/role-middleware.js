import userService from "../services/user-service.js";
import ApiError from "../exceptions/api-error.js";

const roleMiddleware = (role) => {
    return async (req, res, next) => {
        const user = await userService.findUser(req.user.id);
        if (user.role !== role) {
            return next(ApiError.forbidden(`You cannot do this action because you are not a ${role}`));
        }

        next();
    }
}

export default roleMiddleware;