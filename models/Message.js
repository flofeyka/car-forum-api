import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    message: String,
    forum: {
        type: mongoose.Types.ObjectId,
        ref: "Forum",
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    }
});

export default new mongoose.model('Message', messageSchema);
