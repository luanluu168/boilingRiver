if (process.env.NODE_ENV === "production") {
    module.exports = require('./prodDb');
} else {
    module.exports = require('./db');
}