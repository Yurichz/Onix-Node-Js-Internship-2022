const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AuthValidation = require('./validation');
const UserService = require('../User/service');
const AuthService = require('./service');
const ValidationError = require('../../error/ValidationError');

const signIn = async (req, res, next) => {
    try {
        const { error, value } = AuthValidation.signIn(req.body);

        if (error) {
            throw new ValidationError(error.message);
        }

        const user = await UserService.findByEmail(value.email);

        if (!user) { return res.status(404).json({ successFind: false }); }

        await bcrypt.compare(value.password, user.password, (err, result) => {
            if (err) { throw err; }

            if (!result) { return res.status(403).json({ message: 'invalid password' }); }

            const token = AuthService.generateSignInToken(user);

            return res.status(200).json({ data: token });
        });
    } catch (err) {
        return next(err);
    }
};

const authJWT = async (req, res, next) => {
    try {
        const secret = process.env.JWT_SECRET;
        const token = req.headers.authorization;
        const payload = jwt.verify(token, secret);

        req.user = payload;

        return next();
    } catch (err) {
        return next(err);
    }
};

const accountRoute = async (req, res) => res.status(200).json({
    data: req.user,
});

module.exports = {
    signIn,
    authJWT,
    accountRoute,
};
