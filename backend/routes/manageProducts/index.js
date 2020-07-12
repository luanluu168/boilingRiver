const      express = require('express');
const dbConnection = require('../../database');
const       router = express.Router();

router.get('/', (req, res) => {
    //TODO: check user role
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
});

router.get('/categoryOptions', (req, res) => {
    console.log("Get category options is called");
    dbConnection.getConnection((error, connection) => {
        if(error) {
            console.error("Error: " + error);
            return;
        }
        console.log('Connected successfully!');

        connection.query('SELECT id, name FROM Category', (error,rows) => {
            connection.release();
            if(error) {
                console.error("Error: " + error);
                return;
            }

            console.log(rows);
            res.json(rows);
        });
    });
});

router.get('/updateProductInfo/:id', (req, res) => {
    let updateId = req.params.id;
    dbConnection.getConnection((error, connection) => {
        if(error) {
            console.error("Error: " + error);
            return;
        }
        console.log('Connected successfully!');

        connection.query(`SELECT id, name, price, description, bar_code FROM Product WHERE id=${updateId}`, (error,rows) => {
            connection.release();
            if(error) {
                console.error("Error: " + error);
                return;
            }

            res.json(rows);
        });
    });
});


router.post('/delete/:id', (req, res) => {
    let removeId = req.params.id;
    dbConnection.getConnection((error, connection) => {
        if(error) {
            console.error("Error: " + error);
            return;
        }
        console.log('Connected successfully!');

        let query = `DELETE FROM Product WHERE id=` + removeId;
        connection.query(query, (error,rows) => {
            connection.release();
            if(error) {
                console.error("Error: " + error);
                return;
            }

            if(rows.affectedRows === 1) {
                res.json({success: true});
            } else {
                res.json({success: false});
            }
            
        });
    });
});

router.post('/update', (req, res) => {
    let id = req.body.productFormId;
    let name = req.body.productFormName;
    let price = req.body.productFormPrice;
    let description = req.body.productFormDescription;
    let barCode = req.body.productFormBarcode;

    dbConnection.getConnection((error, connection) => {
        if(error) {
            console.error("Error: " + error);
            return;
        }
        console.log('Connected successfully!');

        let query = `UPDATE Product SET name='${name}', price=${price}, description='${description}', bar_code='${barCode}' WHERE id=${id}`;
        console.log(query);
        connection.query(query, (error,rows) => {
            connection.release();
            if(error) {
                console.error("Error: " + error);
                return;
            }

            if(rows.affectedRows === 1) {
                console.log("Update product id=" + id + " sucessfully");  
            } 
            
            res.redirect("/ManageProducts");
        });
    });
});

router.post('/insert', (req, res) => {
    let pName = req.body.productFormName;
    let pPrice = req.body.productFormPrice;
    let pDescription = req.body.productFormDescription;
    let pBarcode = req.body.productFormBarcode;

    let ptSize = req.body.productFormSize;
    let ptColor = req.body.productFormColor;
    let ptQuantity = req.body.productFormQuantity;
    let pTemplateId = 0;

    let categoryId = req.body.productFormCategoryOption;

    dbConnection.getConnection((error, connection) => {
        if(error) {
            console.error("Error: " + error);
            return;
        }
        console.log('Connected successfully!');

        // PRODUCT TEMPLATE
        let query = `INSERT INTO Product_Template(size, color, quantity, category_id) VALUES ('${ptSize}', '${ptColor}', ${ptQuantity}, ${categoryId})`;
        connection.query(query, (error,rows) => {
            if(error) {
                console.error("Error: " + error);
                return;
            }
            
            if(rows.affectedRows === 1) {
                pTemplateId = rows.insertId;

                    // PRODUCT
                query = `INSERT INTO Product(name, price, description, bar_code, product_template_id) VALUES (
                    '${pName}', ${pPrice}, '${pDescription}', '${pBarcode}', ${pTemplateId})`;
                console.log(query);
                for(let i=0; i<ptQuantity; i++) {
                    connection.query(query, (error,rows) => {
                        if(error) {
                            console.error("Error: " + error);
                            return;
                        }

                        if(rows.affectedRows === 1) {
                            console.log("Insert Product successfully");
                        } else {
                            console.log("Insert Product Fail");
                        }
                    });
                }

                connection.release();
                // return res.redirect("/ManageProducts");
            }

            return res.redirect("/ManageProducts");
        });
    });
});


module.exports = router;