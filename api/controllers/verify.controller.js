const jwt = require('jsonwebtoken');
require('dotenv').config();

const verify = {
    verifyToken
};

function verifyToken(req, res, next) {

    try {
        const token = req.headers['authorization'].split('Bearer')[1].replace(/\s+/g, '');

        if (token === undefined || token === null || token === "") {
            res.status(400);
            res.json({
                success: false,
                message: "You cannot consume this service",
                exception: "ForbbidenException"
            });
        }

        const auth = jwt.verify(token , "NITRO");
        if (!auth) {
            res.status(400);
            res.json({
                success: false,
                message: "You cannot consume this service",
                exception: "ForbbidenException"
            });
        }

        req.userID = auth;

        next();
    } catch (error) {
        res.status(400);
        res.json({
            success: false,
            message: "You cannot consume this service",
            exception: "ForbbidenException"
        });
    }
    
}

module.exports = verify;