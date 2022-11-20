const Validation = require('../validation');

class UserValidation extends Validation {
    findById(data) {
        return this.Joi
            .object({
                id: this.Joi
                    .objectId()
                    .required(),
            })
            .validate(data);
    }

    create(data) {
        return this.Joi
            .object({
                firstName: this.Joi
                    .string()
                    .min(2)
                    .max(255)
                    .required(),
                lastName: this.Joi
                    .string()
                    .min(2)
                    .max(255)
                    .required(),
                password: this.Joi
                    .string()
                    .min(6)
                    .max(48)
                    .required(),
                email: this.Joi
                    .string()
                    .email()
                    .required(),
            })
            .validate(data);
    }

    updateById(data) {
        return this.Joi
            .object({
                id: this.Joi
                    .objectId()
                    .required(),
                firstName: this.Joi
                    .string()
                    .min(2)
                    .max(255)
                    .required(),
                lastName: this.Joi
                    .string()
                    .min(2)
                    .max(255)
                    .required(),
                password: this.Joi
                    .string()
                    .min(6)
                    .max(48)
                    .required(),
                email: this.Joi
                    .string()
                    .email()
                    .required(),
            })
            .validate(data);
    }

    deleteById(data) {
        return this.Joi
            .object({
                id: this.Joi
                    .objectId()
                    .required(),
            })
            .validate(data);
    }
}

module.exports = new UserValidation();
