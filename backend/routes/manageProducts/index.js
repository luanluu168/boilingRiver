const      express = require('express');
const dbConnection = require('../../database');
const       router = express.Router();

router.get('/', (req, res) => {
    //TODO: check user role
    let query = `SELECT * FROM "Product"`;
    dbConnection.any(query)
        .then(function (data) {
            // console.log('Manage Product DATA:', data);
            return res.status(200).json(data);
        })
        .catch(function (error) {
            console.log('ERROR:', error)
        });
});

router.get('/categoryOptions', (req, res) => {
    console.log("Get category options is called");
    let query = `SELECT id, name FROM "Category"`;
    dbConnection.any(query)
        .then(function (data) {
            // console.log('Manage Product DATA:', data);
            return res.status(200).json(data);
        })
        .catch(function (error) {
            console.log('ERROR:', error)
        });
});

router.get('/updateProductInfo/:id', (req, res) => {
    let updateId = req.params.id;
    let query = `SELECT id, name, price, description, bar_code FROM "Product" WHERE id=${updateId}`;
    dbConnection.any(query)
        .then(function (data) {
            // console.log('Manage Product DATA:', data);
            return res.status(200).json(data);
        })
        .catch(function (error) {
            console.log('ERROR:', error)
        });
});


router.post('/delete/:id', (req, res) => {
    let removeId = req.params.id;
    let query = `DELETE FROM "Product" WHERE id=$1`;
    let queryParam = [ removeId ];
    dbConnection.result(query, queryParam, r => r.rowCount)
        .then(count => {
            (count === 1) ? res.json({success: true}) : res.json({success: false});
        })
        .catch(error => {
            console.log('ERROR:', error)
        });
});

router.post('/update', (req, res) => {
    let id = req.body.productFormId;
    let name = req.body.productFormName;
    let price = req.body.productFormPrice;
    let description = req.body.productFormDescription;
    let barCode = req.body.productFormBarcode;

    let query = `UPDATE "Product" SET name=$1, price=$2, description=$3, bar_code=$4 WHERE id=$5`;
    let queryParam = [
        name,
        price,
        description,
        barCode,
        id
    ];
    dbConnection.result(query, queryParam, r => r.rowCount)
        .then(count => {
            (count === 1) ? res.json({success: true}) : res.json({success: false});
        })
        .catch(error => {
            console.log('ERROR:', error)
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

    // PRODUCT TEMPLATE
    let query = `INSERT INTO "Product_Template"(size, color, quantity, category_id) VALUES ('${ptSize}', '${ptColor}', ${ptQuantity}, ${categoryId}) RETURNING id`;
    dbConnection.any(query)
        .then(function (data) {
            pTemplateId = data;

            // PRODUCT
            query = `INSERT INTO "Product"(name, price, description, bar_code, product_template_id) VALUES (
                    $1, $2, $3, $4, $5)`;
            let queryParam = [
                pName,
                pPrice,
                pDescription,
                pBarcode,
                pTemplateId
            ];
            for(let i=0; i<ptQuantity; i++) {
                db.result(query, queryParam, r => r.rowCount)
                    .then(count => {
                        (count === 1) ? console.log("Insert Product successfully") : console.log("Insert Product Fail");
                    })
                    .catch(error => {
                        console.log('ERROR:', error)
                    });
            }

            return res.redirect("/ManageProducts");
        })
        .catch(function (error) {
            console.log('ERROR:', error)
        });
});


module.exports = router;