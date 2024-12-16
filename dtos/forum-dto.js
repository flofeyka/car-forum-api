import UserDto from "./user-dto.js";

export default class ForumDto {
    _id;
    title;
    user;
    messages;

    constructor(forum) {
        this._id = forum._id;
        this.title = forum.title;
        this.user = forum.user?.email && new UserDto(forum.user);
        this.messages = forum.length > 0 ? forum.messages[0]?.message && forum.messages : undefined;
    }
}