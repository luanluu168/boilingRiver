const      express = require('express');
const dbConnection = require('../../database');
const       router = express.Router();

router.get('/', (req, res) => {
    if(req.cookies.userLoginInfo.loginStatus) {
        dbConnection.getConnection((error, connection) => {
            if(error) {
                console.error("Error: " + error);
                return;
            }
            console.log('Connected successfully!');

            connection.query('SELECT * FROM Product', (error,rows) => {
                connection.release();
                if(error) {
                    console.error("Error: " + error);
                    return;
                }
                res.json(rows);
            });
        });
    } else {
        res.redirect("/");
    }
});

router.get('/:id', (req, res) => {
    dbConnection.getConnection((error, connection) => {
        if(error) {
            console.error("Error: " + error);
            return;
        }
        console.log('Connected successfully!');

        let query = `SELECT Product.id, Product.name, Product.price, Product.description, Product.bar_code, Product.img_name,
                    Product_Template.quantity
                    FROM Product
                    JOIN Product_Template ON Product.product_template_id = Product_Template.id
                    WHERE Product.id=${req.params.id}`;
        connection.query(query, (error,rows) => {
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