import ApiError from "../exceptions/api-error.js";
import tokenService from "../services/token-service.js";

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw ApiError.unAuthorized();
        }

        const accessToken = authHeader.split(' ')[1];

        if (!accessToken) {
            throw ApiError.unAuthorized();
        }

        const tokenData = tokenService.verifyAccessToken(accessToken);
        if (!tokenData) {
            throw ApiError.unAuthorized();
        }

        req.user = tokenData
        next();
    } catch (e) {
        next(ApiError.unAuthorized());
    }
}

export default authMiddleware;