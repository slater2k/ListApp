const Joi = require('joi');
const BaseRequest = require('./BaseRequest');

class RegisterRequest extends BaseRequest {
    get schema() {
        return Joi.object({
            username: Joi.string()
                .trim(true)
                .min(3)
                .max(30)
                .required()
                .label('Username')
                .messages({
                    'string.min': `Username must be longer than 3 characters`,
                    'string.max': `Username must not be longer than 30 characters`,
                    'any.required': `Username is required`,
                }),

            password: Joi.string()
                .min(5)
                .max(255)
                .required()
                .label('Password')
                .messages({
                    'string.min': `Password must be longer than 5 characters`,
                    'string.max': `Password must not be longer than 255 characters`,
                    'any.required': `Password is required`,
                }),
        });
    }
}

module.exports = RegisterRequest
