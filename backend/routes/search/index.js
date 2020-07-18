const      express = require('express');
const dbConnection = require('../../database');
const       router = express.Router();

router.get('/?searchText=:pName', (req, res) => {
    if(req.params.pName === '') {
        return res.json("");
    }

    let query = `SELECT * FROM "Product" WHERE name LIKE '%${req.params.pName}%'`;
    dbConnection.any(query)
        .then(function (data) {
            return res.status(200).json(data);
        })
        .catch(function (error) {
            console.log('ERROR:', error)
        });
});

router.post('/?searchText=:pName', (req, res) => {
    if(req.params.pName === '') {
        return res.json("");
    }

    let query = `SELECT * FROM "Product" WHERE name LIKE '%${req.params.pName}%'`;
    dbConnection.any(query)
        .then(function (data) {
            return res.status(200).json(data);
        })
        .catch(function (error) {
            console.log('ERROR:', error)
        });
});

router.get('/realtime/:value?', (req, res) => {
    let query = (req.params.value === undefined) ? `SELECT * FROM "Product"` : `SELECT * FROM "Product" WHERE name LIKE '%${req.params.value.toLowerCase()}%'`;

    dbConnection.any(query)
        .then(function (data) {
            return res.status(200).json(data);
        })
        .catch(function (error) {
            console.log('ERROR:', error)
        });
});

module.exports = router;