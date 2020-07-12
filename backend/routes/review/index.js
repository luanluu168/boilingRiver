const      express = require('express');
const dbConnection = require('../../database');
const       router = express.Router();

router.get('/write/?orderId=:oId&ct=:content&r=:rating', (req, res) => {
    dbConnection.getConnection((error, connection) => {
        if(error) {
            console.error("Error: " + error);
            return;
        }

        let       orderId = req.params.oId;
        let reviewContent = req.params.content;
        let rank          = req.params.rating;
          
        
        let query           = "INSERT INTO Review(review_content, " + "`rank`" + `, order_id) VALUES ('${reviewContent}', ${rank}, ${orderId})`;
        connection.query(query, (error,rows) => {
            connection.release();
            if(error) {
                console.error("Error: " + error);
                return;
            }

            console.log("Insert review successfully");
            res.json(rows);
        });
});

})

router.get('/readOnlyReview/?orderId=:oId&ct=:content&r=:rating', (req, res) => {
    dbConnection.getConnection((error, connection) => {
        if(error) {
            console.error("Error: " + error);
            return;
        }

        let     orderId = req.params.oId;
        let query       = "SELECT review_content, " + "`rank`" + ` FROM Review WHERE order_id=${orderId}`;
        connection.query(query, (error,rows) => {
            connection.release();
            if(error) {
                console.error("Error: " + error);
                return;
            }

            res.json(rows);
        });
    });

})

module.exports = router;