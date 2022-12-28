const { Schema, Types } = require('mongoose');
const connections = require('../../config/connection');

const TaskSchema = new Schema(
    {
        assignee: {
            type: Types.ObjectId,
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
        estimatedTime: {
            type: Number,
            required: true,
        },
        createdBy: {
            type: Types.ObjectId,
            required: true,
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
