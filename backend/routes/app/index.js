const      express = require('express');
const dbConnection = require('../../database');
const       router = express.Router();

router.get(['/', '/api'], (req, res) => {
    let query = `SELECT id, name, price, description, bar_code, img_name FROM "Product"`;
    dbConnection.any(query)
        .then(function (data) {
            return res.status(200).json(data);
        })
        .catch(function (error) {
            console.log('ERROR:', error)
        });
});

module.exports = router;