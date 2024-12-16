class ApiError extends Error {
    status;
    errors;

    constructor(status, message, errors = []) {
        super(message);
        this.errors = errors;
        this.status = status;
    }

    static unAuthorized(message = "Unauthorized") {
        return new ApiError(401, message);
    }

    static forbidden(message = "Forbidden") {
        return new ApiError(403, message);
    }

    static badRequest(message = "Bad request") {
        return new ApiError(400, message);
    }

    static notFound(message = "Not Found") {
        return new ApiError(404, message);
    }
}

export default ApiError;