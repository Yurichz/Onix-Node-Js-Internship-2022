const Validation = require('../validation');

class TaskValidation extends Validation {
    findById(data) {
        return this.Joi
            .object({
                id: this.Joi
                    .objectId()
                    .required(),
            })
            .validate(data);
    }

    findByUserId(data) {
        return this.Joi
            .objectId()
            .required()
            .validate(data);
    }
    create(data) {
        return this.Joi
            .object({
                title: this.Joi
                    .string()
                    .min(2)
                    .max(255)
                    .required(),
                description: this.Joi
                    .string()
                    .min(6)
                    .max(48)
                    .required(),
                expiredAt: this.Joi
                    .date()
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
                title: this.Joi
                    .string()
                    .min(2)
                    .max(255),
                description: this.Joi
                    .string()
                    .min(6)
                    .max(48),
                isComplete: this.Joi
                    .boolean(),
                expiredAt: this.Joi
                    .date(),
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

module.exports = new TaskValidation();
