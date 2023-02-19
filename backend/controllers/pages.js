const jwt = require('jsonwebtoken');
const db = require('../server.js');
const { promisify } = require('util');

// Get data
exports.uploads = (req, res) => {

    db.query(`SELECT title FROM albums`, [], (error, result) => {
        if (error) throw error;
        res.json(result);
    });
    
}

exports.auth = async (req, res) => {

    let user = '';

    if (req.cookies.chidodo){

        try {
            const decoded = await promisify(jwt.verify)(req.cookies.chidodo, process.env.JWT_SECRET);

            db.query(`SELECT id, fullname, email FROM user WHERE id = ?`, [decoded.id], (error, result) => {
                if (error) throw error;

                if (!result) {
                    res.json(user);
                    return;
                }

                user = result[0];
                res.json(user);
            })
        } catch (error) {
            console.log(error);
        }

    } else {
        res.json(user);
    }
    
}
