const mongoose = require('mongoose');

const connectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

module.exports = mongoose.createConnection(process.env.MONGO_URL, connectOptions);
