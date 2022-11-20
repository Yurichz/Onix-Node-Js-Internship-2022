const bcrypt = require('bcryptjs');
const UserService = require('./service');
const UserValidation = require('./validation');
const ValidationError = require('../../error/ValidationError');

const handleOk = (res, user) => res.status(200).json({
    data: user,
});

const findAllUsers = async (req, res, next) => {
    try {
        const allUsers = await UserService.findAll();

        return handleOk(res, allUsers);
    } catch (err) {
        return next(err);
    }
};

const findUserById = async (req, res, next) => {
    try {
        const { error } = UserValidation.findById(req.params);

        if (error) {
            throw new ValidationError(error.details);
        }

        const user = await UserService.findById(req.body.id);

        return handleOk(res, user);
    } catch (err) {
        return next(err);
    }
};

const createUser = async (req, res, next) => {
    try {
        const { error } = UserValidation.create(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        const { password } = req.body;

        await bcrypt.genSalt(7, async (e, salt) => bcrypt
            .hash(password, salt, async (err, hash) => {
                if (err) throw err;

                req.body.password = hash;
                const user = await UserService.create(req.body);

                return handleOk(res, user);
            }));
    } catch (err) {
        return next(err);
    }
};

const updateUserById = async (req, res, next) => {
    try {
        const { error } = UserValidation.updateById(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        const user = await UserService.updateById(req.body.id, req.body);

        return handleOk(res, user);
    } catch (err) {
        return next(err);
    }
};

const deleteUserById = async (req, res, next) => {
    try {
        const { error } = UserValidation.deleteById(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        const user = await UserService.deleteById(req.body);

        return handleOk(res, user);
    } catch (err) {
        return next(err);
    }
};

module.exports = {
    findAllUsers,
    findUserById,
    createUser,
    updateUserById,
    deleteUserById,
};
