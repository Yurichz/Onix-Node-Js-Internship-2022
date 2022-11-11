const UserService = require('./service');

const handleError = (res, err) => res.status(422).json({
    error: err.name,
    details: err.message,
});

const handleOk = (res, user) => res.status(200).json({
    data: user,
});

const findAllUsers = async (req, res) => {
    try {
        const allUsers = await UserService.findAll();

        return handleOk(res, allUsers);
    } catch (err) {
        return handleError(err);
    }
};

const findUserById = async (req, res) => {
    try {
        const user = await UserService.findById(req.params.id);

        return handleOk(res, user);
    } catch (err) {
        return handleError(res, err);
    }
};

const createUser = async (req, res) => {
    try {
        const user = await UserService.create(req.body);

        return handleOk(res, user);
    } catch (err) {
        return handleError(res, err);
    }
};

const updateUserById = async (req, res) => {
    try {
        const user = await UserService.updateById(req.body.id, req.body);

        return handleOk(res, user);
    } catch (err) {
        return handleError(res, err);
    }
};

const deleteUserById = async (req, res) => {
    try {
        const user = await UserService.deleteById(req.body.id);

        return handleOk(res, user);
    } catch (err) {
        return handleError(res, err);
    }
};

module.exports = {
    findAllUsers,
    findUserById,
    createUser,
    updateUserById,
    deleteUserById,
};
