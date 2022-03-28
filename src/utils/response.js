"use strict";

/**
 * HTTP Status codes
 */
const STATUS_CODES = {
    CONTINUE: 100,
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    NOT_ACCEPTABLE: 406,
    REQUEST_TIMEOUT: 408,
    CONFLICT: 409,
    REQUEST_ENTITY_TOO_LARGE: 413,
    UNSUPPORTED_MEDIA_TYPE: 415,
    UNPROCESSABLE_ENTITY: 422,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
};

const toResponse = (statusCode, params = {}) => {
    const {
        code = null,
        data = null,
        error = null,
        message = null,
        cpu_time = null,
    } = params;

    if (statusCode < 400) {
        return {
            status: "success",
            data,
            message,
            error,
        };
    } else {
        return {
            status: statusCode < 500 ? "fail" : "error",
            code,
            data,
            message,
            error,
        };
    }
};

/**
 * Utility Class to easily make ExpressJS Response
 */
class Response {
    static get STATUS_CODES() {
        return STATUS_CODES;
    }

    static success(res, params = {}) {
        let status = params.statusCode || res.statusCode;
        if (status >= 400) {
            status = this.STATUS_CODES.OK;
        }
        let body = toResponse(status, params);
        return res.status(status).json(body);
    }

    static fail(res, params = {}) {
        let status = params.statusCode || res.statusCode;
        if (status < 400 || status >= 500) {
            status = this.STATUS_CODES.BAD_REQUEST;
        }
        let body = toResponse(status, params);
        return res.status(status).json(body);
    }

    static error(res, params = {}) {
        let status = params.statusCode || res.statusCode;
        if (status < 500) {
            status = this.STATUS_CODES.INTERNAL_SERVER_ERROR;
        }
        let body = toResponse(status, params);
        return res.status(status).json(body);
    }

    static ok(res, params = {}) {
        let status = this.STATUS_CODES.OK;
        let body = toResponse(status, params);
        return res.status(status).json(body);
    }

    static created(res, params = {}) {
        let status = this.STATUS_CODES.CREATED;
        let body = toResponse(status, params);
        return res.status(status).json(body);
    }

    static accepted(res, params = {}) {
        let status = this.STATUS_CODES.ACCEPTED;
        let body = toResponse(status, params);
        return res.status(status).json(body);
    }

    static noContent(res, params = {}) {
        let status = this.STATUS_CODES.NO_CONTENT;
        let body = toResponse(status, params);
        return res.status(status).json(body);
    }

    static badRequest(res, params = {}) {
        let status = this.STATUS_CODES.BAD_REQUEST;
        let body = toResponse(status, params);
        return res.status(status).json(body);
    }

    static unauthorized(res, params = {}) {
        let status = this.STATUS_CODES.UNAUTHORIZED;
        let body = toResponse(status, params);
        return res.status(status).json(body);
    }

    static forbidden(res, params = {}) {
        let status = this.STATUS_CODES.FORBIDDEN;
        let body = toResponse(status, params);
        return res.status(status).json(body);
    }

    static notFound(res, params = {}) {
        let status = this.STATUS_CODES.NOT_FOUND;
        let body = toResponse(status, params);
        return res.status(status).json(body);
    }

    static notAcceptable(res, params = {}) {
        let status = this.STATUS_CODES.NOT_ACCEPTABLE;
        let body = toResponse(status, params);
        return res.status(status).json(body);
    }

    static requestTimeout(res, params = {}) {
        let status = this.STATUS_CODES.REQUEST_TIMEOUT;
        let body = toResponse(status, params);
        return res.status(status).json(body);
    }

    static conflict(res, params = {}) {
        let status = this.STATUS_CODES.CONFLICT;
        let body = toResponse(status, params);
        return res.status(status).json(body);
    }

    static requestEntityTooLarge(res, params = {}) {
        let status = this.STATUS_CODES.REQUEST_ENTITY_TOO_LARGE;
        let body = toResponse(status, params);
        return res.status(status).json(body);
    }

    static unsupportedMediaType(res, params = {}) {
        let status = this.STATUS_CODES.UNSUPPORTED_MEDIA_TYPE;
        let body = toResponse(status, params);
        return res.status(status).json(body);
    }

    static unprocessableEntity(res, params = {}) {
        let status = this.STATUS_CODES.UNPROCESSABLE_ENTITY;
        let body = toResponse(status, params);
        return res.status(status).json(body);
    }

    static tooManyRequests(res, params = {}) {
        let status = this.STATUS_CODES.TOO_MANY_REQUESTS;
        let body = toResponse(status, params);
        return res.status(status).json(body);
    }

    static internalServerError(res, params = {}) {
        let status = this.STATUS_CODES.INTERNAL_SERVER_ERROR;
        let body = toResponse(status, params);
        return res.status(status).json(body);
    }

    static notImplemented(res, params = {}) {
        let status = this.STATUS_CODES.NOT_IMPLEMENTED;
        let body = toResponse(status, params);
        return res.status(status).json(body);
    }

    static badGateway(res, params = {}) {
        let status = this.STATUS_CODES.BAD_GATEWAY;
        let body = toResponse(status, params);
        return res.status(status).json(body);
    }

    static serviceUnavailable(res, params = {}) {
        let status = this.STATUS_CODES.SERVICE_UNAVAILABLE;
        let body = toResponse(status, params);
        return res.status(status).json(body);
    }

    static gatewayTimeout(res, params = {}) {
        let status = this.STATUS_CODES.GATEWAY_TIMEOUT;
        let body = toResponse(status, params);
        return res.status(status).json(body);
    }
}

module.exports = Response;