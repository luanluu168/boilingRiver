const      express = require('express');
const dbConnection = require('../../database');
const       router = express.Router();

router.get('/?searchText=:pName', (req, res) => {
    if(req.params.pName === undefined || req.params.pName === '') {
        return res.json("");
    }
    
    let query = `SELECT * FROM "Product" WHERE name LIKE '%${req.params.pName.toLowerCase()}%'`;
    dbConnection.any(query)
        .then(function (data) {
            return res.status(200).json(data);
        })
        .catch(function (error) {
            console.log('ERROR:', error)
        });
});

router.post('/?searchText=:pName', (req, res) => {
    if(req.params.pName === undefined || req.params.pName === '') {
        return res.json("");
    }

    let query = `SELECT * FROM "Product" WHERE name LIKE '%${req.params.pName.toLowerCase()}%'`;
    dbConnection.any(query)
        .then(function (data) {
            return res.status(200).json(data);
        })
        .catch(function (error) {
            console.log('ERROR:', error)
        });
});

router.get('/realtime/:value?', (req, res) => {
    let query;
    if(!req.params.value) {
        query = `SELECT * FROM "Product"`;
    } else {
        let          searchText = req.params.value.toLowerCase() + "";
        const replaceSearchText = searchText.replace(/\\/g, ' ');
        query = `SELECT * FROM "Product" WHERE name LIKE '%${replaceSearchText}%'`;
    }

    dbConnection.any(query)
        .then(function (data) {
            return res.status(200).json(data);
        })
        .catch(function (error) {
            console.log('ERROR:', error)
        });
});

module.exports = router;