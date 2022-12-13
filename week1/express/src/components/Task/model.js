const { Schema } = require('mongoose');
const connections = require('../../config/connection');

const TaskSchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        isComplete: {
            type: Boolean,
            default: false,
        },
        expiredAt: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

TaskSchema.index(
    {
        expiredAt: 1,
    },
    {
        expireAfterSeconds: 0,
    },
);

module.exports = connections.model('TaskModel', TaskSchema);
