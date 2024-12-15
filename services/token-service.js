import jwt from "jsonwebtoken";
import Token from "../models/Token.js";
class tokenService {
    generateTokens(user) {
        const payload = {
            id: user._id,
            email: user.email
        }
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
            expiresIn: '15m',
        });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET,{
            expiresIn: '15d',
        });

        return {accessToken, refreshToken};
    }

    async saveToken(refreshToken, user_id) {
        return Token.updateOne({user: user_id}, {refreshToken}, {upsert: true, new: true});
    }

    async findToken(refreshToken) {
        return Token.findOne({refreshToken});
    }

    verifyAccessToken(accessToken) {
        return jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
    }

    async deleteToken(refreshToken) {
        return Token.deleteOne({refreshToken});
    }
};

export default new tokenService();