const boilerMethods = {};
const boilerModel = require('../models/boilerModel');
let boilerMockData = require('../mocks/boilers.json');
require('dotenv').config();

boilerMethods.addBoiler = async (req , res) => {
    try {
        const { boilerId, temperature, madeDate, brand, capacity } = req.body;

        const newBoiler = new boilerModel({
            boilerId, temperature, madeDate, brand, capacity
        });

        await newBoiler.save();

        res.status(200);
        res.json({
            success: true,
            boiler: newBoiler,
            message: "Boiler added successfully"
        });

    } catch (error) {
        res.status(500).send(res.json({
            message: 'An error has occured ' + error.message,
            success: false,
            exception: 'BoilerControllerException'
        }));
    }
}

boilerMethods.getBoilderByBoilerId = async (req , res) => {
    const boilerId = req.params.id;

    const boiler = await boilerModel.findOne({boilerId: boilerId});

    if (boiler) {
        res.status(200).send(res.json({
            success: true,
            boiler: boiler,
            message: "Boiler founded"
        }));
    } else {
        res.status(500).send(res.json({
            success: false,
            message: "Boiler not found",
            stackTrace: error.message,
            exception: "BoilerNotFoundException"
        }));
    }
}

boilerMethods.getAllBoilers = async (req , res) => {
    let boilers = [];

    if (process.env.MOCK === 'true') {
        boilers = boilerMockData;
    } else {
        boilers = await boilerModel.find();
    }

    res.status(200).send(res.json({
        success: true,
        boilers: boilers,
        message: "Boilers founded"
    }));
}

boilerMethods.updateBoiler = async (req , res) => {
    const { boilerId, temperature, madeDate, brand, capacity } = req.body;
    const id = req.params.id;

    try {
        const updatedBoiler = await boilerModel.findOne({_id: id}).updateOne({$set: { boilerId, temperature, madeDate, brand, capacity }});

        res.status(200).send(res.json({
            success: true,
            boiler: updatedBoiler,
            message: "Boiler was updated successfully"
        }));
    } catch (error) {
        res.status(500).send(res.json({
            success: false,
            message: "Boiler was not updated.",
            stackTrace: error.message,
            exception: "UpdateBoilerException"
        }));
    }
}

boilerMethods.deleteBoiler = async (req , res) => {
    const boilerId = req.params.id;
    
    try {
        await boilerModel.findByIdAndRemove(boilerId);
        return res.json({
            success: true,
            message: "Boiler removed successfully"
        });
    } catch (error) {
        res.status(500).send(res.json({
            success: false,
            message: "Boiler was not deleted.",
            stackTrace: error.message,
            exception: "DeleteBoilerException"
        }));
    }
}

module.exports = boilerMethods;