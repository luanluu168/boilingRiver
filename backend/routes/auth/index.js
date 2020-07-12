const        express = require('express');
const   dbConnection = require('../../database');
const {getTimeStamp} = require('../../utils/utils.js');
const         router = express.Router();

router.post('/Signup', (req, res) => {
    let      name = req.body.userSignupName;
    let       age = req.body.userSignupAge;
    let   country = req.body.userSignupCountry;
    let      city = req.body.userSignupCity;
    let     email = req.body.userSignupEmail;
    let  password = req.body.userSignupPassword;
    let timestamp = "'" + getTimeStamp() + "'";

    dbConnection.getConnection((error, connection) => {
        if(error) {
            console.error("Error: " + error);
            return;
        }
        console.log('Connected successfully!');

        // account
        let sql       = `INSERT INTO Account(email_login, password, active, login_date) Values ('${email}', '${password}', true, ${timestamp})`;
        let accountId;
        connection.query(sql, (error,rows) => {
            if(error) {
                console.error("Error: " + error);
                return;
            }
            console.log("rows: " + rows);
            console.log("rows.insertID: " + rows.insertId);
            accountId = rows.insertId;
            // console.log("1");

            // role
            let roleName  = "'user'";
            let roleDescription = "'user'";
            sql       = `INSERT INTO Role(account_id, name, description) Values (${accountId}, ${roleName}, ${roleDescription})`;
            connection.query(sql, (error,rows) => {
                if(error) {
                    console.error("Error: " + error);
                    return;
                }

            });

            // Account_Role_Rel
            sql       = `INSERT INTO Account_Role_Rel(account_id, role_id) Values (${accountId}, ${accountId})`;
            connection.query(sql, (error,rows) => {
                if(error) {
                    console.error("Error: " + error);
                    return;
                }
            });

            // country
            sql       = `INSERT INTO Country(name) Values ('${country}')`;
            connection.query(sql, (error,rows) => {
                if(error) {
                    console.error("Error: " + error);
                    return;
                }
            });
            // city
            sql       = `INSERT INTO City(name) Values ('${city}')`;
            connection.query(sql, (error,rows) => {
                if(error) {
                    console.error("Error: " + error);
                    return;
                }
            });
            // create customer
            sql       = `INSERT INTO Customer(full_name, email, age, account_id, country_id, city_id) Values ('${name}', '${email}', ${age}, ${accountId}, ${accountId}, ${accountId})`;
            connection.query(sql, (error,rows) => {
                connection.release();
                if(error) {
                    console.error("Error: " + error);
                    return;
                }
                console.log("User sign up successfully!");

                res.status(200).redirect('/Signin');
            });
        });
    });
});

router.post('/Signout', (req, res) => {
    //destroy session
    if(req.session.User) {
        req.session.destroy( err => {
            if(err) {
                return res.send('Error logging out');
            }
        });
    }
    if(req.cookies.userLoginInfo) {
        res.clearCookie("userLoginInfo");
    }

    return res.status(200).redirect("/");
});

router.post('/Signin', (req, res) => {
    dbConnection.getConnection((error, connection) => {
        if(error) {
            console.error("Error: " + error);
            return;
        }
        console.log('Connected successfully!');

        let loginEmail = req.body.userEmail;
        let loginPassword = req.body.userPassword;
        let query = `SELECT Account.id, Account.email_login, Account.password,
                            Role.name,
                            Customer.full_name AS customerName 
                    FROM Account
                    JOIN Customer ON Account.id = Customer.account_id
                    JOIN Account_Role_Rel ON Account_Role_Rel.account_id = Account.id
                    JOIN Role ON Role.id = Account_Role_Rel.role_id
                    WHERE Account.email_login= '${loginEmail}';`;

        connection.query(query, (error,rows) => {
            connection.release();
            if(error) {
                console.error("Error: " + error);
                return;
            }

            if(rows.length === 0) {
                return res.redirect('/Signin');
            }

            if(rows[0].name == 'user' && rows[0].password == loginPassword) {
                req.session.valid = true;
                req.session.User = {
                    aId: rows[0].id,
                    role: 'user',
                    name: rows[0].customerName,
                    email: loginEmail,
                    loginStatus: true
                };
                res.cookie("userLoginInfo", JSON.stringify(req.session.User), { maxAge: 2 * 60 * 60 * 1000 });
                res.redirect('/');
            } else if ((rows[0].name == 'manager' && rows[0].password == loginPassword) || (rows[0].name == 'employee' && rows[0].password == loginPassword)){
                req.session.valid = true;
                req.session.User = {
                    aId: rows[0].id,
                    role: rows[0].name,
                    name: rows[0].customerName,
                    email: loginEmail,
                    loginStatus: true
                };
                res.cookie("userLoginInfo", JSON.stringify(req.session.User), { maxAge: 2 * 60 * 60 * 1000 });
                res.redirect('/');
            } else {
                res.redirect('/Signin');
            }
        });
    });
});

router.get('/Signin', (req, res) => {
    res.redirect('/api');
});

module.exports = router;