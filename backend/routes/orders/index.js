const      express = require('express');
const dbConnection = require('../../database');
const       router = express.Router();
const {getTimeStamp, getNextWeekTimeStamp} = require('../../utils/utils.js');

router.post('/?aId=:aId&array=:addOrders', (req, res) => {
    let userIsLogin;
    if(req.cookies.userLoginInfo) {
       userIsLogin = JSON.parse(req.cookies.userLoginInfo).loginStatus;
    } 

    if(userIsLogin) {
        let userAccountId = req.params.aId;
        // check customer
        let query    = `SELECT "Customer".id, "Customer".account_id, "Account".email_login FROM "Customer", "Account" WHERE "Customer".account_id="Account".id AND "Customer".account_id=${userAccountId}`;
        dbConnection.any(query)
            .then(function (data) {
                let customerId = data[0].id;

                query       = `SELECT id FROM "Order" WHERE status='draft' AND customer_id=${customerId}`;
                dbConnection.any(query)
                    .then(function (data) {
                        if(data) {
                            let timestamp         = getTimeStamp();
                            let nextWeekTimeStamp = getNextWeekTimeStamp();
                            // create an order
                            let status            = "'draft'";
                            let quantity          =  1;
                            let price             = req.body.total;
                            let total             = price * quantity;
                            query                 = `INSERT INTO "Order"(order_date, delivered_date, total, status, customer_id) VALUES ('${timestamp}', '${nextWeekTimeStamp}', ${total}, ${status}, ${customerId}) RETURNING id`;
                            dbConnection.any(query).then(function (data) {
                                let orderId = data[0].id;
                                let productIds = [...JSON.parse(req.params.addOrders)];
                                productIds.forEach(productId => {
                                    // add order line to this order
                                    query           = `INSERT INTO "Order_Line"(quantity, total_price, order_id, product_id) VALUES ($1, $2, $3, $4)`;
                                    let queryParam = [
                                        quantity,
                                        total,
                                        orderId,
                                        productId
                                    ];
                                    dbConnection.result(query, queryParam, r => r.rowCount)
                                        .then(count => {
                                            (count === 1) ? console.log("Order_Line is created") : console.log("Error when creating Order_Line");
                                        })
                                        .catch(error => {
                                            console.log('ERROR:', error)
                                        });
                                });
                                // goto order page
                                res.redirect("/Payment/oId=" + orderId);
                            });
                        }
                    })
                    .catch(function (error) {
                        console.log('ERROR:', error)
                    });
            })
            .catch(function (error) {
                console.log('ERROR:', error)
            });
    } else {
        res.redirect("/Signin");
    }
});

router.get('/?getOId=:oId', (req, res) => {
    let userIsLogin;
    if(req.cookies.userLoginInfo) {
       userIsLogin = JSON.parse(req.cookies.userLoginInfo).loginStatus;
    } 
    if(userIsLogin) {
        let orderId = req.params.oId;
        let query = `SELECT "Order".id, "Order".customer_id, "Order".order_date, "Order".delivered_date, "Order".total, "Customer".full_name FROM "Order", "Customer" WHERE "Customer".id = "Order".customer_id AND "Order".id=` + orderId;
        dbConnection.any(query)
                    .then(function (data) {
                        res.json(data[0]);
                    })
                    .catch(function (error) {
                        console.log('ERROR:', error)
                    });
    } else {
        res.redirect("/");
    }
});


router.post('/delete/?orderId=:oId', (req, res) => {
    let userIsLogin;
    if(req.cookies.userLoginInfo) {
       userIsLogin = JSON.parse(req.cookies.userLoginInfo).loginStatus;
    } 
    if(userIsLogin) {
        let removeOrderId = req.params.oId;
        let query = `DELETE FROM "Order" WHERE "Order".id=$1`;
        let queryParam = [ removeOrderId ];
        dbConnection.result(query, queryParam, r => r.rowCount)
            .then(count => {
                (count === 1) ? console.log("Delete order successfully") : console.log("Error while deleting order");
                
                res.redirect("/");
            })
            .catch(error => {
                console.log('ERROR:', error)
            });
    } else {
        res.redirect("/");
    }
});

router.get('/?fetchCustomerOrder=:aId', (req, res) => {
    if(req.params.aId == "''") {
        console.log("********* unsignin");
        res.redirect("/");
        return;
    }

    let userIsLogin;
    if(req.cookies.userLoginInfo) {
       userIsLogin = JSON.parse(req.cookies.userLoginInfo).loginStatus;
    } 

    if(userIsLogin) {
        let accountId = req.params.aId;
        let query      = `SELECT "Customer".id FROM "Customer", "Account" WHERE "Customer".account_id="Account".id AND "Customer".account_id=` + accountId;
        dbConnection.any(query)
                    .then(function (data) {
                        let customerId  = data[0].id;
                        query           = `SELECT id, order_date, delivered_date, total, status FROM "Order" WHERE "Order".customer_id=` + customerId;
               
                        dbConnection.any(query)
                            .then(function (data) {
                                res.json(data);
                            })
                            .catch(function (error) {
                                console.log('ERROR:', error)
                            });
                    })
                    .catch(function (error) {
                        console.log('ERROR:', error)
                    });
    } else {
        res.redirect("/");
    }
});

module.exports = router;