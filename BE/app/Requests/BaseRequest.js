const Joi = require('joi');

class BaseRequest {

    constructor(original) {
        this.original = original;
    }

    /**
     * Gets the validation schema of the current request
     *
     * @returns {Joi.ObjectSchema<any>}
     */
    get schema() {
        return Joi.object({});
    }

    /**
     * Validates the current request
     *
     * @returns {{error: {field: string, message: string}[], value: any}}
     */
    validate() {
        let { value, error } = this.schema.validate(this.original, {abortEarly: false});

        error = error.details.map((err) => {
            return {
                message: err.message,
                field: err.context.label
            };
        });

        return {value: value, error: error};
    }
}

module.exports = BaseRequest
