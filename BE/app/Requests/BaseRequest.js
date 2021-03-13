const Joi = require('joi');

class BaseRequest {

    constructor(original) {
        this.original = original;
    }

    get schema() {
        return Joi.object({});
    }

    validate() {
        return this.schema.validate(this.original, {abortEarly: false});
    }
}

module.exports = BaseRequest
