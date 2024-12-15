import User from "../models/User.js";
import ApiError from "../exceptions/api-error.js";
import * as bcrypt from "bcrypt";
import tokenService from "./token-service.js";
import UserDto from "../dtos/user-dto.js";

class authService {
    async signUp({fullName, email, password}) {
        const userExists = await User.findOne({email});
        if (userExists) {
            throw ApiError.unAuthorized('User already exists with this email');
        }

        const passwordSalt = await bcrypt.genSalt(15, "a");
        const hashedPassword = await bcrypt.hash(password, passwordSalt);
        const newUser = await User.create({fullName, email, password: hashedPassword});
        const {accessToken, refreshToken} = tokenService.generateTokens(newUser);
        await tokenService.saveToken(refreshToken, newUser._id);

        return {user: new UserDto(newUser), accessToken, refreshToken};
    }

    async signIn({email, password}) {
        const userFound = await User.findOne({email});
        if (!userFound) {
            throw ApiError.unAuthorized('Wrong email or password');
        }

        const passwordCompared = await bcrypt.compare(password, userFound.password);

        if (!passwordCompared) {
            throw ApiError.unAuthorized('Wrong email or password');
        }

        const {accessToken, refreshToken} = tokenService.generateTokens(userFound);
        await tokenService.saveToken(refreshToken, userFound._id);

        return {user: new UserDto(userFound), accessToken, refreshToken};
    }

    async logout(refreshToken) {
        const result = await tokenService.deleteToken(refreshToken);
        if (result.deletedCount === 0) {
            throw ApiError.unAuthorized('Wrong token');
        }

        return {
            success: true, message: "You successfully logged out"
        }
    }
}

export default new authService();