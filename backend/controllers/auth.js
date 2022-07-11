const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config({ path: './.env' });
const db = require('../server.js');
const { promisify } = require('util');
const path = require('path');

exports.login = async(req, res) => {

    let validationResult = "";
    let errorList = [];

    let { email, password } = req.body;
    // res.json(req.body.username);

    //check for emptiness in both username and password
    if (email && password) {
        //check for email or username existence in database
        db.query('SELECT id, fullname, email, passcode FROM user WHERE email=?', [email], async(error, result) => {
            if (error) throw error;

            if ( result.length > 0) {

                if ( email == result[0].email && password == result[0].passcode ) {

                    const id = result[0].id;
                    //create token for user
                    token = jwt.sign({ id }, process.env.JWT_secret, { expiresIn: process.env.JWT_EXP});
                    //create cookie
                    res.cookie(
                        'chidodo',
                         token,
                            {
                                // maxAge: new Date(Date.now() * 90*24*60*60*1000),
                                maxAge: 2*24*60*60*1000,
                                // expire : new Date(Date.now() * 90*24*60*60*1000),
                                httpOnly: true,
                                sameSite: 'none',
                                // secure: false,
                                // sameSite: 'lax',
                                secure: true
                            }
                    );
                    // res.cookie('chidodo',token, { maxAge: 900000, httpOnly: true });

                    // successful
                    console.log(id);
                    validationResult = {
                        auth: { status: 'ok', statusCode: 200, message: 'authenticated' },
                        user: { id, fullname: result[0].fullname, email: result[0].email }
                    };
                    errorList.push(validationResult);
                    // console.log(token);
                    res.json(errorList);
                    
                } else {
                    validationResult = {
                        auth: {status: 'failed', statusCode: 405, message: 'email or password is incorrect!'},
                        user: { id:"", fullname: "", email: email }
                    };
                    errorList.push(validationResult);
                    res.json(errorList);
                }
                
            } else {
                validationResult = {
                    auth: {status: 'failed', statusCode: 405, message: 'email does not exist!'},
                    user: { id: "", fullname: "", email: email }
                };
                errorList.push(validationResult);
                res.json(errorList);
                
            }
        });

    } else {
        validationResult = {
            auth: {status: 'failed', statusCode: 405, message: 'please fill in all fields!'},
            user: { id: "", fullname: "", email: email }
        };
        errorList.push(validationResult);
        res.json(errorList);
    }

}

exports.isLoggedIn = async(req, res, next) => {

    if (req.cookies.chidodo){

        try {
            const decoded = await promisify(jwt.verify)(req.cookies.chidodo, process.env.JWT_SECRET);

            db.query(`SELECT * FROM users WHERE id = ?`, [decoded.id], (error, result) => {
                if (error) throw error;

                if (!result) {
                    return next();
                }

                console.log(decoded)
                req.user = result[0];
                return next();
            })
        } catch (error) {
            console.log(error);
        }

    } else {
        next();
    }

}

exports.editProfile = (req, res) => {

    const { id } = req.params;
    let errorList = [];

    let { name, email } = req.body;

    name = name.toLowerCase().replace(/ /g, "_");
    email = email.toLowerCase().replace(/ /g, "_");

    const validator = ({ id, name, email }) => {

        let nameRegex = /^([a-zA-Z]+)$/;
        let emailRegex = /^([a-zA-Z0-9\.\-_]+)@([a-zA-Z0-9\-]+)\.([a-z]{2,10})(\.[a-z]{2,10})?$/;

        let validationResult = "";

        // check for emptiness
        // if (!first=="" && !last=="" && !user=="" && !mail=="" && !telephone=="" && !nation=="" && !hobby=="") {
        if (name && email) {
            //check regex for name
            if (nameRegex.test(name)) {
                //check regex for Email
                if (emailRegex.test(email)) {
                    // check email existence in database
                    db.query("SELECT id, fullname, email FROM user WHERE email = ?", [email], async(error, result) => {
                        if (error) throw error;

                        if (await result.length < 1 || await result[0].email == email) {

                            // let newName = result[0].fullname;
                            // let newEmail = result[0].email;

                            //everything goes here
                            if (!Array.isArray(errorList) || !errorList.length) {
                                //update the user info in database
                                db.query("UPDATE user SET ? WHERE id = ?", [{fullname: name, email: email}, id], (error, result) => {

                                    if (error) throw error;
                                    validationResult = {
                                        auth: {status: `ok`, statusCode: 200, message: `account updated successfully`},
                                        user: { id, fullname: name, email: email }
                                    };
                                    errorList.push(validationResult);
                                    res.json(errorList);

                                });


                                // ValidationResult = {status: `OK`, statusCode: 200, message: `Account successfully updated!`};
                                // errorList.push(ValidationResult);
                                // res.json(errorList);

                            } else {
                                console.log(errorList);
                            }
                                    
                                
                        } else {
                            validationResult = {
                                auth: {status: `failed`, statusCode: 405, message: `Email is already in use!`},
                                user: { id, fullname: "", email: "" }
                            };
                            errorList.push(validationResult);
                            res.json(errorList);
                        }

                    }); 

                } else {
                    validationResult = {
                        auth: {status: `failed`, statusCode: 405, message: `Invalid email address!`},
                        user: { id, fullname: "", email: "" }
                    };
                    errorList.push(validationResult);
                    res.json(errorList);
                }
            } else {
                validationResult = {
                    auth: {status: `failed`, statusCode: 405, message: `Name is invalid, symbols and numbers are not allowed!`},
                    user: { id, fullname: "", email: "" }
                };
                errorList.push(validationResult);
                res.json(errorList);
            }
        } else {
            validationResult = {
                auth: {status: `failed`, statusCode: 405, message: `Please, fill in all fields!`},
                user: { id, fullname: "", email: "" }
            };
            errorList.push(validationResult);
            res.json(errorList);
        }
    }

    validator({id, name, email});
    
}

exports.password = (req, res) => {

    let { id } = req.params;

    let { oldPassword, newPassword, confirmPassword } = req.body;

    let validationResult = "";
    let errorList = [];

    if (oldPassword && newPassword && confirmPassword) {
        db.query('SELECT passcode FROM user WHERE id =?', [id], (error, result) => {
            if (error) throw error;

            if ( result.length > 0 && result[0].passcode==oldPassword) {
                if (newPassword === confirmPassword) {
                    db.query('UPDATE user SET passcode=? WHERE id =?', [newPassword, id], (error, result) => {
                        if (error) throw error;
    
                        validationResult = {status: 'ok', statusCode: 200, message: 'Password successfully changed!'};
                        errorList.push(validationResult);
                        res.json(errorList);
    
                    });
    
                } else {
                    validationResult = {status: 'failed', statusCode: 405, message: 'new password does not match the confirmed password!'};
                    errorList.push(validationResult);
                    res.json(errorList);
                }
            } else {
                validationResult = {status: 'failed', statusCode: 405, message: 'old password is incorrect!'};
                errorList.push(validationResult);
                res.json(errorList);
            }

        });
        
    } else {
        validationResult = {status: 'failed', statusCode: 405, message: 'please fill in all fields!'};
        errorList.push(validationResult);
        res.json(errorList);
    }
}

exports.logout = (req, res) => {

    let validationResult = "";
    let errorList = [];

    // res.cookie('api', 'logout', { expires: new Date(
    //     Date.now + 2 *1000
    // ), httpOnly: true});

    res.cookie(
        'chidodo',
         'logout',
            {
                // maxAge: new Date(Date.now() * 90*24*60*60*1000),
                maxAge: 1000,
                // expire : new Date(Date.now() * 90*24*60*60*1000),
                httpOnly: true,
                secure: true
            }
    );

    validationResult = {status: `ok`, statusCode: 200, message: `Goodbye!`};
    errorList.push(validationResult);
    res.json(errorList);

}