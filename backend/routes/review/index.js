const      express = require('express');
const dbConnection = require('../../database');
const       router = express.Router();

router.get('/write/?orderId=:oId&ct=:content&r=:rating', (req, res) => {
    let       orderId = req.params.oId;
    let reviewContent = req.params.content;
    let rank          = req.params.rating;
      
    let query           = `INSERT INTO "Review"(review_content, rank, order_id) VALUES ('${reviewContent}', ${rank}, ${orderId})`;
    dbConnection.any(query)
        .then(function (data) {
            return res.status(200).json(data);
        })
        .catch(function (error) {
            console.log('ERROR:', error)
        });
});

router.get('/readOnlyReview/?orderId=:oId&ct=:content&r=:rating', (req, res) => {
    let     orderId = req.params.oId;
    let query       = `SELECT review_content, rank FROM "Review" WHERE order_id=${orderId}`;
    dbConnection.any(query)
        .then(function (data) {
            return res.status(200).json(data);
        })
        .catch(function (error) {
            console.log('ERROR:', error)
        });
});

module.exports = router;