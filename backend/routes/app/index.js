const      express = require('express');
const dbConnection = require('../../database');
const       router = express.Router();

router.get(['/', '/api'], (req, res) => {
    dbConnection.getConnection((error, connection) => {
        if(error) {
            console.error("Error: " + error);
            return;
        }
        console.log('Connected successfully!');

        // let query = "SELECT Product.id, Product.`name`, Product.price, Product.`description`, Product.bar_code, img_name " +
        //             "Review.`rank` " +
        //             "FROM Product " +
        //             "JOIN Order_Line ON Product.id = Order_Line.product_id " +
        //             "JOIN `Order` ON Order_Line.order_id = `Order`.id " +
        //             "JOIN Review ON `Order`.id = Review.Order_id";
        let query = "SELECT id, `name`, price, `description`, bar_code, img_name FROM Product";
        connection.query(query, (error,rows) => {
            connection.release();
            if(error) {
                console.error("Error: " + error);
                return;
            }
            
            res.status(200).json(rows);
        });
    });
});

module.exports = router;