const        express = require('express');
const   dbConnection = require('../../database');
const {getTimeStamp} = require('../../utils/utils.js');
const        bcrypt = require('bcrypt');
const         router = express.Router();

const      NUM_SALTS = 8;

// router.post('/Signup/:userSignupName&:userSignupAge&:userSignupCountry&:userSignupCity&:userSignupEmail&:userSignupPassword', async (req, res) => {
//     let      name = req.params.userSignupName;
//     let       age = req.params.userSignupAge;
//     let   country = req.params.userSignupCountry;
//     let      city = req.params.userSignupCity;
//     let     email = req.params.userSignupEmail;
//     let  password = req.params.userSignupPassword;
//     let timestamp = "'" + getTimeStamp() + "'";

//     // account
//     let sql       = `INSERT INTO "Account"(email_login, password, active, login_date) Values ('${email}', '${password}', true, ${timestamp}) RETURNING id`;
//     await dbConnection.any(sql)
//         .then(async (data) => {
//             let accountId = data[0].id;
            
//             // role
//             let roleName  = "'user'";
//             let roleDescription = "'user'";
//             sql       = `INSERT INTO "Role"(account_id, name, description) Values (${accountId}, ${roleName}, ${roleDescription}) RETURNING id`;
//             let roleId = await dbConnection.any(sql).then(function (data) {
//                 return data[0].id; })
//                 .catch(function (error) { 
//                     console.log('ERROR:', error);
//                     res.json({errMsg: "401"});
//                 });  

//             // Account_Role_Rel
//             sql       = `INSERT INTO "Account_Role_Rel"(account_id, role_id) Values (${accountId}, ${roleId})`;
//             await dbConnection.any(sql).catch(function (error) { 
//                 console.log('ERROR:', error);
//                 res.json({errMsg: "402"});
//             });  

//             // country
           
//             sql       = `INSERT INTO "Country"(name) Values ('${country}') RETURNING id`;
//             let countryId = await dbConnection.any(sql).then(function (data) {
//                 return data[0].id; })
//                 .catch(function (error) { 
//                     console.log('ERROR:', error);
//                     res.json({errMsg: "403"});
//                 });  

//             // city
//             sql       = `INSERT INTO "City"(name) Values ('${city}') RETURNING id`;
//             let cityId = await dbConnection.any(sql).then(function (data) {
//                 return data[0].id; })
//                 .catch(function (error) { 
//                     console.log('ERROR:', error);
//                     res.json({errMsg: "404"});
//                 }); 

//             // create customer
//             sql       = `INSERT INTO "Customer"(full_name, email, age, account_id, country_id, city_id) Values ('${name}', '${email}', ${age}, ${accountId}, ${countryId}, ${cityId})`;
//             dbConnection.any(sql)
//                 .then(function (data) {
//                     console.log("User sign up successfully!");

//                     res.status(200).json({errMsg: "none"});
//                 })
//                 .catch(function (error) {
//                     if(error) {
//                         res.json({errMsg: error});
//                     }
//                 });  
//         })
//         .catch(function (error) {
//             console.log('ERROR:', error);
//             res.status(405).json({errMsg: error});
//         });
// });

router.post('/Signup/:userSignupName&:userSignupAge&:userSignupCountry&:userSignupCity&:userSignupEmail&:userSignupPassword', (req, res) => {
    let      name = req.params.userSignupName;
    let       age = req.params.userSignupAge;
    let   country = req.params.userSignupCountry;
    let      city = req.params.userSignupCity;
    let     email = req.params.userSignupEmail;
    let  password = req.params.userSignupPassword;
    let timestamp = "'" + getTimeStamp() + "'";
    let      hash = bcrypt.hashSync(password, NUM_SALTS);

    // account
    let sql       = `INSERT INTO "Account"(email_login, password, active, login_date) Values ('${email}', '${hash}', true, ${timestamp}) RETURNING id`;
    dbConnection.any(sql)
        .then(function (data) {
            let accountId = data[0].id;
            
            // role
            let roleName  = "'user'";
            let roleDescription = "'user'";
            sql       = `INSERT INTO "Role"(account_id, name, description) Values (${accountId}, ${roleName}, ${roleDescription}) RETURNING id`;
            dbConnection.any(sql).then(function (data) {
                    let roleId = data[0].id;

                     // Account_Role_Rel
                    sql       = `INSERT INTO "Account_Role_Rel"(account_id, role_id) Values (${accountId}, ${roleId})`;
                    dbConnection.any(sql).catch(function (error) { 
                        res.json({errMsg: error});
                    });  

                    // country
                    sql       = `INSERT INTO "Country"(name) Values ('${country}') RETURNING id`;
                    dbConnection.any(sql).then(function (data) {
                            let countryId = data[0].id;

                            // city
                            sql       = `INSERT INTO "City"(name) Values ('${city}') RETURNING id`;
                            dbConnection.any(sql).then(function (data) {
                                    let cityId = data[0].id;

                                    // create customer
                                    sql       = `INSERT INTO "Customer"(full_name, email, age, account_id, country_id, city_id) Values ('${name}', '${email}', ${age}, ${accountId}, ${countryId}, ${cityId})`;
                                    dbConnection.any(sql)
                                        .then(function (data) {
                                            console.log("User sign up successfully!");

                                            res.status(200).json({errMsg: "none"});
                                        })
                                        .catch(function (error) {
                                            if(error) {
                                                res.json({errMsg: error});
                                            }
                                        });
                                })
                                .catch(function (error) { 
                                    res.json({errMsg: error});
                                }); 
                        })
                        .catch(function (error) { 
                            res.json({errMsg: error});
                        });  
                })
                .catch(function (error) { 
                    res.json({errMsg: error});
                });    
        })
        .catch(function (error) {
            res.json({errMsg: {detail: `Email: ${email} already exists`} });
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

router.post('/Signin/:userEmail&:userPassword', (req, res) => {
    let    loginEmail = req.params.userEmail;
    let loginPassword = req.params.userPassword;
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
            if(data.length === 0) {
                return res.json({errMsg: "Email was incorrect"});
            }

            const isValidatePassword = bcrypt.compareSync(loginPassword, data[0].password);
            if(data[0].name == 'user' && (data[0].password == loginPassword || isValidatePassword)) {
                req.session.valid = true;
                req.session.User = {
                    aId: data[0].id,
                    role: 'user',
                    name: data[0].customerName,
                    email: loginEmail,
                    loginStatus: true
                };
                res.cookie("userLoginInfo", JSON.stringify(req.session.User), { maxAge: 2 * 60 * 60 * 1000 });
                res.json({errMsg: "none"});
            } else if ((data[0].name == 'manager' && (data[0].password == loginPassword || isValidatePassword)) || (data[0].name == 'employee' && (data[0].password == loginPassword || isValidatePassword))){
                req.session.valid = true;
                req.session.User = {
                    aId: data[0].id,
                    role: data[0].name,
                    name: data[0].customerName,
                    email: loginEmail,
                    loginStatus: true
                };
                res.cookie("userLoginInfo", JSON.stringify(req.session.User), { maxAge: 2 * 60 * 60 * 1000 });
                res.json({errMsg: "none"});
            } else {
                res.json({errMsg: "Password is wrong"});
            }

        })
        .catch(function (error) {
            console.log('ERROR:', error);
            res.json({errMsg: error});
        });
});

router.get('/Signin', (req, res) => {
    res.redirect('/api');
});

module.exports = router;