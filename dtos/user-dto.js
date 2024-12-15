export default class UserDto {
    _id;
    fullName;
    email;
    role;

    constructor(user) {
        this._id = user._id;
        this.fullName = user.fullName;
        this.email = user.email;
        this.role = user.role;
    }
}