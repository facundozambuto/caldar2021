const jwt = require('jsonwebtoken');
require('dotenv').config();

const verify = {
    verifyToken
};

function verifyToken(req, res, next) {

    const token = req.headers['authorization'];

    if (token === undefined || token === null || token === "") {
        res.status(500).send(res.json({
            success: false,
            message: "You cannot consume this service",
            exception: "ForbbidenException"
        }));
    }

    const auth = jwt.verify(token , "NITRO");
    if (!auth) {
        res.status(500).send(res.json({
            success: false,
            message: "You cannot consume this service",
            exception: "ForbbidenException"
        }));
    }

    req.userID = auth;

    next();
}

module.exports = verify;