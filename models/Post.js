import mongoose from "mongoose";
import User from "./User.js";

const postSchema = new mongoose.Schema({
    title: {
        type: String, required: true,
    }, content: {
        type: String, required: true,
    }, images: [String], user: {type: mongoose.Types.ObjectId, ref: "User", required: true}
});

export default mongoose.model('Post', postSchema);