function clientErrorHandler(err, req, res, next) {
    if (err) {
        return res.status(err.code || 500).json({
            error: err.name,
            details: err.message,
        });
    }

    return next();
}

module.exports = clientErrorHandler;
