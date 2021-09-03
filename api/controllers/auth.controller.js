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

    newUser.password = await newUser.encryptPassword(password);

    try {
        await newUser.save();

        res.status(200).send(res.json({
            success: true,
            message: "User registered succesfully",
            username: newUser.username,
            password: newUser.password
        }));

    } catch (error) {
        res.status(500).send(res.json({
            success: false,
            message: "Error trying to register user",
            stackTrace: error.message,
            username: newUser.username
        }));
    }
}

authMethods.signin = async (req , res) => {
    const { username , password } = req.body;
    
    const user = await UserModel.findOne({username: username});

    if (!user) {
        return res.status(500).send(res.json({
            auth: false,
            message: 'User not found',
            success: false,
            exception: 'UserNotFoundException'
        }));
    }

    const autenticate = user.confirmPassword(password);
    
    if (!autenticate) {
        return res.status(500).send(res.json({
            auth: false,
            message: 'Invalid credentials',
            success: false,
            exception: 'InvalidCredentialsException'
        }));
    }

    const token = jwt.sign(user._id.toString() , process.env.SECURE_KEY)
    if (!token)  {
        return res.status(500).send(res.json({
            auth: false,
            message: 'An error has occured',
            success: false,
            exception: 'TokenException'
        }));
    }

    return res.status(200).send(res.json({
        auth: true,
        token: token,
        success: true
    }));
}

authMethods.confirmToken = async (req , res) => {
    const { token } = req.body;
    
    if (token === "") {
        return res.status(500).send(res.json({
            auth: false,
            message: 'Token was not provided',
            success: false,
            exception: 'TokenException'
        }));
    }

    const verify = jwt.verify(token , process.env.SECURE_KEY);
    
    if (!verify) {
        return res.status(500).send(res.json({
            auth: false,
            message: 'Token was not provided',
            success: false,
            exception: 'TokenException'
        }));
    }

    return res.status(200).send(res.json({
        auth: 'valid',
        token: token,
        success: true
    }));
}

module.exports = authMethods;