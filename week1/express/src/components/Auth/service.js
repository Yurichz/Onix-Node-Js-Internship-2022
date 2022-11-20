const jwt = require('jsonwebtoken');

function generateSignInToken(user) {
    const secret = process.env.JWT_SECRET;
    const payload = {
        firstName: user.firstName,
        email: user.email,
        id: user.id,
    };

    return jwt.sign(payload, secret, { expiresIn: '30m' });
}

module.exports = {
    generateSignInToken,
};
