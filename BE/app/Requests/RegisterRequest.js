const Joi = require('joi');
const BaseRequest = require('./BaseRequest');

class RegisterRequest extends BaseRequest {
    get schema() {
        return Joi.object({
            username: Joi.string()
                .alphanum()
                .min(3)
                .max(30)
                .required()
                .label('Username')
                .messages({
                    'string.alphanum': `Username cannot contain any special characters`,
                    'string.min': `Username must be longer than 3 characters`,
                    'string.max': `Username must not be longer than 30 characters`,
                    'any.required': `Username is required`
                }),

            password: Joi.string()
                .alphanum()
                .min(3)
                .max(255)
                .required()
                .label('Password')
                .messages({
                    'string.alphanum': `Username cannot contain any special characters`,
                    'string.min': `Username must be longer than 3 characters`,
                    'string.max': `Username must not be longer than 30 characters`,
                    'any.required': `Username is required`
                }),
        });
    }
}

module.exports = RegisterRequest
