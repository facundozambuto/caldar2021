const authMethods = {}
const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

authMethods.signup = async (req , res) => {
    const { username, password } = req.body;

    const newUser = new UserModel({
        username, 
        password
    });

    try {
        newUser.password = await newUser.encryptPassword(password);

        await newUser.save();

        res.status(200);
        res.json({
            success: true,
            message: "User registered succesfully. ",
            username: newUser.username,
            password: newUser.password
        });
    } catch (error) {
        res.status(400);
        res.json({
            message: 'An error has occured ' + error.message,
            success: false,
            exception: 'BoilerControllerException',
            stackTrace: error.message,
            username: newUser.username
        });
    }
}

authMethods.signin = async (req , res) => {
    try {
        const { username, password } = req.body;
    
        const user = await UserModel.findOne({username: username});
    
        if (!user) {
            res.status(400);
            res.json({
                auth: false,
                message: 'User not found. ',
                success: false,
                exception: 'UserNotFoundException'
            });
        }
    
        const autenticate = await user.confirmPassword(password);
        
        if (!autenticate) {
            res.status(400);
            res.json({
                auth: false,
                message: 'Invalid credentials. ',
                success: false,
                exception: 'InvalidCredentialsException'
            });
        }
    
        const token = jwt.sign(username, "NITRO")
        if (!token)  {
            res.status(400);
            res.json({
                auth: false,
                message: 'An error has occured. ',
                success: false,
                exception: 'TokenException'
            });
        }
    
        res.status(200);
        res.json({
            auth: true,
            token: token,
            user: user,
            success: true
        });
    } catch (error) {
        res.status(400);
        res.json({
            auth: false,
            message: 'An error has occured ' + error.message,
            success: false,
            exception: 'TokenException'
        });
    }
}

authMethods.confirmToken = async (req , res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
    
        if (token === "") {
            res.status(400);
            res.json({
                auth: false,
                message: 'Token was not provided ',
                success: false,
                exception: 'TokenException'
            });
        }
    
        const verify = jwt.verify(token , "NITRO");
        
        if (!verify) {
            res.status(400);
            res.json({
                auth: false,
                message: 'Token was not provided ',
                success: false,
                exception: 'TokenException'
            });
        }
    
        res.status(200);
        res.json({
            auth: 'valid',
            token: token,
            success: true
        });
    } catch (error) {
        res.status(400);
        res.json({
            auth: false,
            message: 'Token was not provided. ' + error.message,
            success: false,
            exception: 'TokenException'
        });
    }
}

module.exports = authMethods;