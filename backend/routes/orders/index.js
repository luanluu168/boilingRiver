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
        dbConnection.getConnection((error, connection) => {
            if(error) {
                console.error("Error: " + error);
                return;
            }
            console.log('Connected successfully!');
        
            let userAccountId = req.params.aId;
            // check customer
            let query    = `SELECT Customer.id, Customer.account_id, Account.email_login FROM Customer, Account WHERE Customer.account_id=Account.id AND Customer.account_id=${userAccountId}`;
            connection.query(query, (error,rows) => {
                if(error) {
                    console.error("Error: " + error);
                    return;
                }

                let customerId;
                if(rows != null) {
                    customerId = rows[0].id;
                }

                query       = "SELECT id FROM `Order` WHERE `status`='draft' AND customer_id=" + `${customerId}`;
                connection.query(query, (error,rows) => {
                    if(error) {
                        console.error("Error: " + error);
                        return;
                    }

                    if(rows) { // if the customer does not have a order yet
                        let timestamp         = getTimeStamp();
                        let nextWeekTimeStamp = getNextWeekTimeStamp();
                        // create an order
                        let status            = "'draft'";
                        let quantity          =  1;
                        let price             = 20;
                        let total             = price * quantity;
                        query                 = "INSERT INTO `Order`" + `(order_date, delivered_date, total, status, customer_id) VALUES ('${timestamp}', '${nextWeekTimeStamp}', ${total}, ${status}, ${customerId})`;
                        connection.query(query, (error,rows) => {
                            if(error) {
                                console.error("Error: " + error);
                                return;
                            }

                            let orderId = rows.insertId;
                            let productIds = [...JSON.parse(req.params.addOrders)];
                            productIds.forEach(productId => {
                                // add order line to this order
                                query           = `INSERT INTO Order_Line(quantity, total_price, order_id, product_id) VALUES (${quantity}, ${total}, ${orderId}, ${productId})`;
                                connection.query(query, (error,rows) => {
                                    if(error) {
                                        console.error("Error: " + error);
                                        return;
                                    }

                                    console.log("Order_Line is created");
                                });
                            });

                            // goto order page
                            res.redirect("/Payment/oId=" + orderId);
                        });
                    } 
                    // else { // if the order is existed
                    
                    // }
                });
            });
           
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
        dbConnection.getConnection((error, connection) => {
            if(error) {
                console.error("Error: " + error);
                return;
            }
            console.log('Connected successfully!');

            let orderId = req.params.oId;
            let query = "SELECT `Order`.id, `Order`.customer_id, `Order`.order_date, `Order`.delivered_date, `Order`.total, Customer.full_name FROM `Order`, Customer WHERE Customer.id = `Order`.customer_id AND `Order`.id=" + orderId;
            connection.query(query, (error,rows) => {
                connection.release();
                if(error) {
                    console.error("Error: " + error);
                    return;
                }
        
                res.json(rows[0]);
            });
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
        dbConnection.getConnection((error, connection) => {
            if(error) {
                console.error("Error: " + error);
                return;
            }
            console.log('Connected successfully!');
    
            let removeOrderId = req.params.oId;
            let query = "DELETE FROM `Order` WHERE `Order`.id=" + removeOrderId;
            connection.query(query, (error,rows) => {
                connection.release();
                if(error) {
                    console.error("Error: " + error);
                    return;
                }
        
                res.redirect("/");
            });
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
        dbConnection.getConnection((error, connection) => {
            if(error) {
                console.error("Error: " + error);
                return;
            }
            console.log('Connected successfully!');

            let accountId = req.params.aId;
            let query      = "SELECT Customer.id FROM Customer, `Account` WHERE Customer.account_id=Account.id AND Customer.account_id=" + accountId;
            connection.query(query, (error,rows) => {
                if(error) {
                    console.error("Error: " + error);
                    return;
                }
        
                console.log("rows = " + JSON.stringify(rows));
                let customerId    = rows[0].id;
                query           = "SELECT id, order_date, delivered_date, total, status FROM `Order` WHERE `Order`.customer_id=" + customerId;
                connection.query(query, (error,rows) => {
                    connection.release();
                    if(error) {
                        console.error("Error: " + error);
                        return;
                    }
                
                    return res.json(rows);
                });
            });
        });
    } else {
        res.redirect("/");
    }
});

module.exports = router;