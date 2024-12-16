import Forum from "../models/Forum.js";
import ApiError from "../exceptions/api-error.js";
import ForumDto from "../dtos/forum-dto.js";

class forumService {
    async getForums() {
        const forum_list = await Forum.find({}).populate('user');
        return forum_list.map(forum => new ForumDto(forum));
    }

    async createForum(user_id, {title}) {
        const forum = await Forum.create({user: user_id, title});
        return new ForumDto(forum);
    }

    async getForumById(_id) {
        const forum = await Forum.findOne({_id}).populate('user').populate({path: 'messages', populate: 'user'});
        if (!forum) {
            throw ApiError.notFound("Forum not found");
        }

        return new ForumDto(forum);
    }

    async deleteForum(_id) {
        const deleteResult = await Forum.deleteOne({_id});

        if (deleteResult.deletedCount !== 1) {
            throw ApiError.forbidden("Cannot delete the forum");
        }

        return {
            success: true, message: "The forum is successfully deleted"
        }
    }

    async updateForum(_id, {title}) {
        const updateResult = await Forum.updateOne({_id}, {title});
        if (updateResult.modifiedCount !== 1) {
            throw ApiError.forbidden('Cannot update the forum');
        }

        return {
            success: true, message: "Forum title is successfully updated"
        }
    }
}

export default new forumService();