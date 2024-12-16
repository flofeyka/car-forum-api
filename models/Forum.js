import mongoose from "mongoose";

const forumSchema = new mongoose.Schema({
    title: String, messages: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Message'
    }], user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
});

export default mongoose.model('Forum', forumSchema);