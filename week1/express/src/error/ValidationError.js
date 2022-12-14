class ValidationError extends Error {
    constructor(message) {
        super();
        this.message = message;
        this.name = 'E_MISSING_OR_INVALID_PARAMS';
        this.code = 422;
    }
}

module.exports = ValidationError;
