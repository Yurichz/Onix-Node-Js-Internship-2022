const express = require('express');
const http = require('http');
const clientErrorHandler = require('../filters/clientError');
const {
    authJWT,
} = require('../components/Auth');

// ROUTERS
const DemoRouter = require('../components/Demo/router');
const UserRouter = require('../components/User/router');
const TaskRouter = require('../components/Task/router');
const AuthRouter = require('../components/Auth/router');

module.exports = {
    init(app) {
        const router = express.Router();

        app.use('/v1/demo', DemoRouter);

        app.use('/v1/user', UserRouter);

        app.use('/v1/task', authJWT, TaskRouter);

        app.use('/v1/auth', AuthRouter);

        app.use(clientErrorHandler);

        app.use((req, res) => {
            res.status(404).send(http.STATUS_CODES[404]);
        });

        app.use(router);
    },
};
