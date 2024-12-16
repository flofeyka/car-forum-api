import mongoose from "mongoose";
import Token from "./Token.js";
import Forum from "./Forum.js";
import Message from "./Message.js";
import Post from "./Post.js";

const userSchema = new mongoose.Schema({
    fullName: {type: String, required: true},
    email: {type: String, unique: true},
    password: {type: String, required: true},
    role: {type: String, required: true, default: 'user'},
})

userSchema.pre('deleteOne', async function (next) {
    const user = this;
    await Token.deleteMany({user_id: user._id});
    await Forum.deleteMany({user_id: user._id});
    await Message.deleteMany({user_id: user._id});
    await Post.deleteMany({user_id: user._id});
    next();
})

export default mongoose.model('User', userSchema);
