import UserDto from "./user-dto.js";

export class MessageDto {
    _id;
    message;
    user;

    constructor(message) {
        this._id = message._id;
        this.message = message.message;
        this.user = new UserDto(message.user);
    }
}