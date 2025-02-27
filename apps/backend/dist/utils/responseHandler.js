"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseHandler {
    success(res, statusCode = 200, message, result) {
        return res.status(statusCode).send({
            statusCode,
            isSuccess: true,
            message,
            result,
        });
    }
    error(res, statusCode = 500, message, error) {
        return res.status(statusCode).send({
            statusCode,
            isSuccess: false,
            message,
            error,
        });
    }
}
exports.default = new ResponseHandler();
