import User from "../models/User.js";
import ApiError from "../exceptions/api-error.js";

class userService {
    async editUser(user_id, {fullName}) {
        const resultData = await User.updateOne({_id: user_id}, {fullName});
        if (resultData.modifiedCount !== 1) {
            throw ApiError.badRequest("You should send a new values for updating");
        }

        return {
            success: true, message: "You successfully updated user data",
        }
    }

    async findUser(user_id) {
        return User.findOne({_id: user_id});
    }

    async getUserById(user_id) {
        const user = await this.findUser(user_id);
        return new User(user);
    }
}

export default new userService();