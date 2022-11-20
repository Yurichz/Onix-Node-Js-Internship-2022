const { Router } = require('express');
const {
    signIn,
    authJWT,
    accountRoute,
} = require('./index');

const router = Router();

router.post('/login', signIn);

router.post('/account', authJWT, accountRoute);

module.exports = router;
