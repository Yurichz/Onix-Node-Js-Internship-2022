const UserModel = require('./model');
const bcrypt = require('bcryptjs');

function findAll() {
    return UserModel.find({}).exec();
}

function findById(id) {
    return UserModel.findById(id).exec();
}

function findByEmail(email) {
    return UserModel.findOne({ email }).exec();
}

function create(profile) {
    return UserModel.create(profile);
}

function updateById(_id, newProfile) {
    return UserModel.updateOne({ _id }, newProfile).exec();
}

function deleteById(_id) {
    return UserModel.deleteOne({ _id }).exec();
}

async function hashPassword(password, next) {
    try {
        const salt = await bcrypt.genSalt(7);
        const hashedPassword = await bcrypt.hash(password, salt);

        return hashedPassword;
    } catch (error) {
        next(error);
    }
}

module.exports = {
    findAll,
    findById,
    findByEmail,
    create,
    updateById,
    deleteById,
    hashPassword,
};
