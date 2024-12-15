import UserDto from "./user-dto.js";

export default class PostDto {
    _id;
    title;
    user;
    content;
    images;

    constructor(post) {
        this._id = post._id;
        this.title = post.title;
        this.user = post.user.email && new UserDto(post.user);
        this.content = post.content;
        this.images = post.images;
    }
}