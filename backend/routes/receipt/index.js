const        express = require('express');
const   dbConnection = require('../../database');
const {getTimeStamp} = require('../../utils/utils.js');
const         router = express.Router();

router.post('/:oId&pt=:paymentType', (req, res) => {
    let orderId = req.params.oId;
    let paymentType = req.params.paymentType;
    let query = "SELECT Payment.id, Payment.payment_date, Payment.amount, `Order`.order_date, `Order`.delivered_date, `Order`.total, `Order`.`status`, Payment_Method.`name` " +
                "FROM Payment " +
                "JOIN `Order` ON `Order`.id = Payment.order_id " +
                "JOIN Payment_Line ON Payment_Line.payment_id = Payment.id " +
                "JOIN Order_Line ON Order_Line.id = Payment_Line.order_line_id " +
                "JOIN Payment_Method ON Payment_Method.id = Payment.payment_method_id " +
                "WHERE `Order`.id=" + `${orderId}`;
    dbConnection.getConnection((error, connection) => {
        if(error) {
            console.error("Error: " + error);
            return;
        }

        connection.query(query, (error,rows) => {
            if(error) {
                console.error("Error: " + error);
                return;
            }

            if(rows[0] == null) { // if rows is undefined
                let timestamp = `'${getTimeStamp()}'`;
                // create an payment
                query       = "SELECT total FROM `Order` WHERE `Order`.id=" + orderId;
                connection.query(query, (error,rows) => {
                    if(error) {
                        console.error("Error: " + error);
                        return;
                    }
    
                    let amount    = rows[0].total;
                    let status    = "'paid'";
                    query       = `INSERT INTO Payment(payment_date, amount, status, order_id, payment_method_id) VALUES (${timestamp}, ${amount}, ${status}, ${orderId}, ${paymentType})`;
                    connection.query(query, (error,rows) => {
                        if(error) {
                            console.error("Error: " + error);
                            return;
                        }
    
                        // get the payment id
                        if (rows) {
                            console.log("Inside receipt post, rows has a value!");
                        } 
    
                        let paymentId     = rows.insertId;
                        // get the orderLineId
                        query           = "SELECT id FROM Order_Line WHERE order_id=" + orderId;
                        console.log(query);
                        connection.query(query, (error,rows) => {
                            if(error) {
                                console.error("Error: " + error);
                                return;
                            }

                            let orderLineId   = rows[0].id;
                
                            // add the payment to payment line
                            query           = `INSERT INTO Payment_Line(payment_id, order_line_id) VALUES (${paymentId}, ${orderLineId})`;
                            connection.query(query, (error,rows) => {
                                if(error) {
                                    console.error("Error: " + error);
                                    return;
                                }
    
                                console.log("Finish");

                                //update status
                                query       = "UPDATE `Order` SET `status`='paid' WHERE id=" + orderId;
                                connection.query(query, (error,rows) => {
                                    if(error) {
                                        console.error("Error: " + error);
                                        return;
                                    }

                                    // set cart Info cookie to be empty
                                    res.cookie("cartInfo", "", { maxAge: 20 * 60 * 60 * 1000 });
                                    res.json(rows);
                                });
                            });
                        });
                    });
                }); 
            } else {
                
            }
        });
    });
});


// display receipt 
router.get('/:oId', (req, res) => {
    dbConnection.getConnection((error, connection) => {
        if(error) {
            console.error("Error: " + error);
            return;
        }

        let orderId = req.params.oId;
        let query = "SELECT Payment.id, Payment.payment_date, Payment.amount, `Order`.order_date, `Order`.delivered_date, `Order`.total, `Order`.`status`, Payment_Method.`name` " +
                    "FROM Payment " + 
                    "JOIN `Order` ON `Order`.id = Payment.order_id " + 
                    "JOIN Payment_Line ON Payment_Line.payment_id = Payment.id " +
                    "JOIN Order_Line ON Order_Line.id = Payment_Line.order_line_id " +
                    "JOIN Payment_Method ON Payment_Method.id = Payment.payment_method_id " +
                    "WHERE `Order`.id=" + `${orderId}`;
        connection.query(query, (error,rows) => {
            if(error) {
                console.error("Error: " + error);
                return;
            }

            res.json(rows);
        });

    });
});

module.exports = router;

