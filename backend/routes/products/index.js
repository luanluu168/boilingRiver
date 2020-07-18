const      express = require('express');
const dbConnection = require('../../database');
const       router = express.Router();

router.get('/', (req, res) => {
    if(req.cookies.userLoginInfo.loginStatus) {
        let query = `SELECT * FROM "Product"`;
        dbConnection.any(query)
            .then(function (data) {
                return res.status(200).json(data);
            })
            .catch(function (error) {
                console.log('ERROR:', error)
            });
    } else {
        res.redirect("/");
    }
});

router.get('/:id', (req, res) => {
    let query = `SELECT "Product".id, "Product".name, "Product".price, "Product".description, "Product".bar_code, "Product".img_name,
                    "Product_Template".quantity
                    FROM "Product"
                    JOIN "Product_Template" ON "Product".product_template_id = "Product_Template".id
                    WHERE "Product".id=${req.params.id}`;
    dbConnection.any(query)
            .then(function (data) {
                return res.status(200).json(data);
            })
            .catch(function (error) {
                console.log('ERROR:', error)
            });
});

module.exports = router;