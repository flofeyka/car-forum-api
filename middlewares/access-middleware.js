import ApiError from "../exceptions/api-error.js";
import User from "../models/User.js";

const accessMiddleware = (Model) => async (req, res, next) => {
    try {
        const model = await Model.findById(req.params.id || req.body.id).populate("user");
        const user = await User.findOne({_id: req.user.id});
        if (model.user._id !== user._id && user.role !== 'admin') {
            next(ApiError.forbidden('You have not authorized access this resource'))
        }

        next();
    } catch(e) {
        console.log(e);
        next(ApiError.forbidden('You have not authorized access this resource'));
    }
}

export default accessMiddleware;