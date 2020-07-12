const      express = require('express');
const dbConnection = require('../../database');
const       router = express.Router();

router.get('/?searchText=:pName', (req, res) => {
    if(req.params.pName === '') {
        return res.json("");
    }

    dbConnection.getConnection((error, connection) => {
        if(error) {
            console.error("Error: " + error);
            return;
        }
        console.log('Connected successfully!');

        let sql = `SELECT * FROM Product WHERE name LIKE '%${req.params.pName}%'`;
        connection.query(sql, (error,rows) => {
            connection.release();
            if(error) {
                console.error("Error: " + error);
                return;
            }

            res.json(rows);
        });
    });
});

router.post('/?searchText=:pName', (req, res) => {
    if(req.params.pName === '') {
        return res.json("");
    }


    dbConnection.getConnection((error, connection) => {
        if(error) {
            console.error("Error: " + error);
            return;
        }
        console.log('Connected successfully!');

        let sql = `SELECT * FROM Product WHERE name LIKE '%${req.params.pName}%'`;
        connection.query(sql, (error,rows) => {
            connection.release();
            if(error) {
                console.error("Error: " + error);
                return;
            }

            res.json(rows);
        });
    });
});

router.get('/realtime/:value?', (req, res) => {
    let sql = (req.params.value === undefined) ? `SELECT * FROM Product` : `SELECT * FROM Product WHERE name LIKE '%${req.params.value}%'`;

    dbConnection.getConnection((error, connection) => {
        if(error) {
            console.error("Error: " + error);
            return;
        }
        console.log('Connected successfully!');
        
        connection.query(sql, (error,rows) => {
            connection.release();
            if(error) {
                console.error("Error: " + error);
                return;
            }

            res.json(rows);
        });
    });
});

module.exports = router;