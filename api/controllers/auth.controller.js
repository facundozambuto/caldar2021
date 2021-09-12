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

        res.status(200).send(res.json({
            success: true,
            message: "User registered succesfully. " + error.message,
            username: newUser.username,
            password: newUser.password
        }));
    } catch (error) {
        res.status(500).send(res.json({
            success: false,
            message: "Error trying to register user. " + error.message,
            stackTrace: error.message,
            username: newUser.username
        }));
    }
}

authMethods.signin = async (req , res) => {
    try {
        const { username, password } = req.body;
    
        const user = await UserModel.findOne({username: username});
    
        if (!user) {
            res.status(500).send(res.json({
                auth: false,
                message: 'User not found. ' + error.message,
                success: false,
                exception: 'UserNotFoundException'
            }));
        }
    
        const autenticate = user.confirmPassword(password);
        
        if (!autenticate) {
            res.status(500).send(res.json({
                auth: false,
                message: 'Invalid credentials. ' + error.message,
                success: false,
                exception: 'InvalidCredentialsException'
            }));
        }
    
        const token = jwt.sign(user._id.toString(), process.env.SECURE_KEY)
        if (!token)  {
            res.status(500).send(res.json({
                auth: false,
                message: 'An error has occured. ' + error.message,
                success: false,
                exception: 'TokenException'
            }));
        }
    
        return res.status(200).send(res.json({
            auth: true,
            token: token,
            success: true
        }));
    } catch (error) {
        res.status(500).send(res.json({
            auth: false,
            message: 'An error has occured ' + error.message,
            success: false,
            exception: 'TokenException'
        }));
    }
}

authMethods.confirmToken = async (req , res) => {
    try {
        const { token } = req.body;
    
        if (token === "") {
            return res.status(500).send(res.json({
                auth: false,
                message: 'Token was not provided ' + error.message,
                success: false,
                exception: 'TokenException'
            }));
        }
    
        const verify = jwt.verify(token , process.env.SECURE_KEY);
        
        if (!verify) {
            res.status(500).send(res.json({
                auth: false,
                message: 'Token was not provided ' + error.message,
                success: false,
                exception: 'TokenException'
            }));
        }
    
        res.status(200).send(res.json({
            auth: 'valid',
            token: token,
            success: true
        }));
    } catch (error) {
        res.status(500).send(res.json({
            auth: false,
            message: 'Token was not provided. ' + error.message,
            success: false,
            exception: 'TokenException'
        }));
    }
}

module.exports = authMethods;