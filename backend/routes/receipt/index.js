const        express = require('express');
const   dbConnection = require('../../database');
const {getTimeStamp} = require('../../utils/utils.js');
const         router = express.Router();

router.post('/:oId&pt=:paymentType', (req, res) => {
    let orderId = req.params.oId;
    let paymentType = req.params.paymentType;
    let query = `SELECT "Payment".id, "Payment".payment_date, "Payment".amount, "Order".order_date, "Order".delivered_date, "Order".total, "Order".status, "Payment_Method".name ` +
                `FROM "Payment" ` +
                `JOIN "Order" ON "Order".id = "Payment".order_id ` +
                `JOIN "Payment_Line" ON "Payment_Line".payment_id = "Payment".id ` +
                `JOIN "Order_Line" ON "Order_Line".id = "Payment_Line".order_line_id ` +
                `JOIN "Payment_Method" ON "Payment_Method".id = "Payment".payment_method_id ` +
                `WHERE "Order".id=` + `${orderId}`;
    dbConnection.any(query)
            .then(function (data) {
                if(data[0] == null) {
                    let timestamp = `'${getTimeStamp()}'`;
                    // create an payment
                    query       = `SELECT total FROM "Order" WHERE "Order".id=` + orderId;
                    dbConnection.any(query)
                        .then(function (data) {
                            let amount    = data[0].total;
                            let status    = "'paid'";
                            query       = `INSERT INTO "Payment"(payment_date, amount, status, order_id, payment_method_id) VALUES (${timestamp}, ${amount}, ${status}, ${orderId}, ${paymentType}) RETURNING id`;
                          
                            dbConnection.any(query)
                                .then(function (data) {
                                    let paymentId     = data[0].id;
                                    // get the orderLineId
                                    query           = `SELECT id FROM "Order_Line" WHERE order_id=` + orderId;
                                    
                                    dbConnection.any(query)
                                        .then(function (data) {
                                            let orderLineId   = data[0].id;
                
                                            // add the payment to payment line
                                            query           = `INSERT INTO "Payment_Line"(payment_id, order_line_id) VALUES (${paymentId}, ${orderLineId})`;
                                          
                                            dbConnection.any(query)
                                                .then(function (data) {

                                                    //update status
                                                    query       = `UPDATE "Order" SET status='paid' WHERE id=` + orderId;

                                                    dbConnection.any(query)
                                                        .then(function (data) {
                                                            // set cart Info cookie to be empty
                                                            res.cookie("cartInfo", "", { maxAge: 20 * 60 * 60 * 1000 });
                                                            res.json(data);
                                                        })
                                                        .catch(function (error) {
                                                            console.log('ERROR:', error)
                                                        });
                                                })
                                                .catch(function (error) {
                                                    console.log('ERROR:', error)
                                                });
                                        })
                                        .catch(function (error) {
                                            console.log('ERROR:', error)
                                        });
                                })
                                .catch(function (error) {
                                    console.log('ERROR:', error)
                                });
                        })
                        .catch(function (error) {
                            console.log('ERROR:', error)
                        });
                }
            })
            .catch(function (error) {
                console.log('ERROR:', error)
            });
});


// display receipt 
router.get('/:oId', (req, res) => {
    let orderId = req.params.oId;
    let query = `SELECT "Payment".id, "Payment".payment_date, "Payment".amount, "Order".order_date, "Order".delivered_date, "Order".total, "Order".status, "Payment_Method".name ` +
                `FROM "Payment" ` + 
                `JOIN "Order" ON "Order".id = "Payment".order_id ` + 
                `JOIN "Payment_Line" ON "Payment_Line".payment_id = "Payment".id ` +
                `JOIN "Order_Line" ON "Order_Line".id = "Payment_Line".order_line_id ` +
                `JOIN "Payment_Method" ON "Payment_Method".id = "Payment".payment_method_id ` +
                `WHERE "Order".id=` + `${orderId}`;
    dbConnection.any(query)
        .then(function (data) {
            return res.status(200).json(data);
        })
        .catch(function (error) {
            console.log('ERROR:', error)
        });
});

module.exports = router;

