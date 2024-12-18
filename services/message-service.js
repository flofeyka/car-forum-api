import Forum from "../models/Forum.js";
import ApiError from "../exceptions/api-error.js";
import Message from "../models/Message.js";
import {MessageDto} from "../dtos/message-dto.js";

class messageService {
    async createMessage(forum_id, message, user_id) {
        const forum = await Forum.findOne({_id: forum_id}).populate('messages');
        if (!forum) {
            throw ApiError.notFound('Forum not found');
        }

        const newMessage = await Message.create({message, user: user_id, forum: forum_id})
        await Forum.updateOne({_id: forum._id}, {
            $push: {
                messages: newMessage._id
            }
        })

        const messageFound = await Message.findById(newMessage._id).populate('user');
        return new MessageDto(messageFound);
    }

    async deleteMessage(message_id) {
        const deleteResult = await Message.deleteOne({_id: message_id});
        if (deleteResult.deletedCount !== 1) {
            throw ApiError.notFound('Message not found');
        }

        return {
            success: true, message: "The message is successfully deleted"
        }
    }

    async updateMessage(message_id, message) {
        const updateResult = await Message.updateOne({_id: message_id}, {message});
        if (updateResult.modifiedCount !== 1) {
            throw ApiError.notFound('Forum not found');
        }

        return {
            success: true, message: "The message is successfully updated"
        }
    }

}

export default new messageService();