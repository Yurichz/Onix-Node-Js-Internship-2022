const Validation = require('../validation');

class AuthValidation extends Validation {
    signIn(data) {
        return this.Joi
            .object({
                email: this.Joi
                    .string()
                    .email()
                    .required(),
                password: this.Joi
                    .string()
                    .min(6)
                    .max(48)
                    .required(),
            })
            .validate(data);
    }
}

module.exports = new AuthValidation();
