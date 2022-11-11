const mongoose = require('mongoose');

const connectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

module.exports = mongoose.createConnection('mongodb://localhost:27016/internship', connectOptions);
