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

    // account
    let sql       = `INSERT INTO "Account"(email_login, password, active, login_date) Values ('${email}', '${password}', true, ${timestamp}) RETURNING id`;
    dbConnection.any(sql)
        .then(function (data) {
            let accountId = data[0].id;
            
            // role
            let roleName  = "'user'";
            let roleDescription = "'user'";
            sql       = `INSERT INTO "Role"(account_id, name, description) Values (${accountId}, ${roleName}, ${roleDescription})`;
            dbConnection.any(sql).catch(function (error) { console.log('ERROR:', error) });  

            // Account_Role_Rel
            sql       = `INSERT INTO "Account_Role_Rel"(account_id, role_id) Values (${accountId}, ${accountId})`;
            dbConnection.any(sql).catch(function (error) { console.log('ERROR:', error) });  

            // country
            sql       = `INSERT INTO "Country"(name) Values ('${country}')`;
            dbConnection.any(sql).catch(function (error) { console.log('ERROR:', error) });  

            // city
            sql       = `INSERT INTO "City"(name) Values ('${city}')`;
            dbConnection.any(sql).catch(function (error) { console.log('ERROR:', error) });  

            // create customer
            sql       = `INSERT INTO "Customer"(full_name, email, age, account_id, country_id, city_id) Values ('${name}', '${email}', ${age}, ${accountId}, ${accountId}, ${accountId})`;
            dbConnection.any(sql)
                .then(function (data) {
                    console.log("User sign up successfully!");

                    res.status(200).redirect('/Signin');
                })
                .catch(function (error) {
                    if(error) {
                        console.error("Error: " + error);
                        res.redirect("/Signup");
                    }
                });  
        })
        .catch(function (error) {
            console.log('ERROR:', error);
            res.redirect("/Signup");
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
    let loginEmail = req.body.userEmail;
    let loginPassword = req.body.userPassword;
    let query = `SELECT "Account".id, "Account".email_login, "Account".password,
                        "Role".name,
                        "Customer".full_name AS "customerName" 
                FROM "Account"
                JOIN "Customer" ON "Account".id = "Customer".account_id
                JOIN "Account_Role_Rel" ON "Account_Role_Rel".account_id = "Account".id
                JOIN "Role" ON "Role".id = "Account_Role_Rel".role_id
                WHERE "Account".email_login= '${loginEmail}'`;
    dbConnection.any(query)
        .then(function (data) {
            if(data.lenth === 0) {
                return res.redirect('/Signin');
            }

            if(data[0].name == 'user' && data[0].password == loginPassword) {
                req.session.valid = true;
                req.session.User = {
                    aId: data[0].id,
                    role: 'user',
                    name: data[0].customerName,
                    email: loginEmail,
                    loginStatus: true
                };
                res.cookie("userLoginInfo", JSON.stringify(req.session.User), { maxAge: 2 * 60 * 60 * 1000 });
                res.redirect('/');
            } else if ((data[0].name == 'manager' && data[0].password == loginPassword) || (data[0].name == 'employee' && data[0].password == loginPassword)){
                req.session.valid = true;
                req.session.User = {
                    aId: data[0].id,
                    role: data[0].name,
                    name: data[0].customerName,
                    email: loginEmail,
                    loginStatus: true
                };
                res.cookie("userLoginInfo", JSON.stringify(req.session.User), { maxAge: 2 * 60 * 60 * 1000 });
                res.redirect('/');
            } else {
                console.log("Inside Signin: none login");
                res.redirect('/Signin');
            }

        })
        .catch(function (error) {
            console.log('ERROR:', error)
        });
});

router.get('/Signin', (req, res) => {
    res.redirect('/api');
});

module.exports = router;