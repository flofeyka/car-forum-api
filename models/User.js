import mongoose from "mongoose";
import Token from "./Token.js";

const userSchema = new mongoose.Schema({
    fullName: {type: String, required: true},
    email: {type: String, unique: true},
    password: {type: String, required: true},
    role: {type: String, required: true, default: 'user'},
})

userSchema.pre('deleteOne', async function (next) {
    const user = this;
    await Token.deleteMany({user_id: user._id});
    next();
})

export default mongoose.model('User', userSchema);
