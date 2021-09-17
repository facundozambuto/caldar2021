const customerMethods = {};
const customerModel = require('../models/customerModel.js');
// let customerMockData = require('../mocks/boilers.json');
require('dotenv').config();

customerMethods.addCustomer = async (req , res) => {
    try {
        const { customerId, name, surname, dateOfBirth, dni, created_at } = req.body;

        const newCustomer = new customerModel({
            customerId, name, surname, dateOfBirth, dni, created_at
        });

        await newCustomer.save();

        res.status(200);
        res.json({
            success: true,
            customer: newCustomer,
            message: "Customer added successfully"
        });

    } catch (error) {
        res.status(500).send(res.json({
            message: 'An error has occured ' + error.message,
            success: false,
            exception: 'CustomerControllerException'
        }));
    }
}

customerMethods.getCustomerById = async (req , res) => {
    const customerId = req.params.id;

    const customer = await customerModel.findOne({customerId: customerId});

    if (customer) {
        res.status(200).send(res.json({
            success: true,
            customer: customer,
            message: "Customer founded"
        }));
    } else {
        res.status(500).send(res.json({
            success: false,
            message: "Customer not found",
            stackTrace: error.message,
            exception: "CustomerNotFoundException"
        }));
    }
}

customerMethods.getAllCustomers = async (req , res) => {
    let customers = [];
    customers = await customerModel.find();

    res.status(200).send(res.json({
        success: true,
        customers: customers,
        message: "Customers founded"
    }));
}

customerMethods.updateCustomer = async (req , res) => {
    const { customerId, name, surname, dateOfBirth, dni, created_at } = req.body;
    const id = req.params.id;

    try {
        const updatedCustomer = await customerModel.findOne({_id: id}).updateOne({$set: { customerId, name, surname, dateOfBirth, dni, created_at }});

        res.status(200).send(res.json({
            success: true,
            customer: updatedCustomer,
            message: "Customer was updated successfully"
        }));
    } catch (error) {
        res.status(500).send(res.json({
            success: false,
            message: "Customer was not updated.",
            stackTrace: error.message,
            exception: "UpdateCustomerException"
        }));
    }
}


customerMethods.deleteCustomer = async (req , res) => {
    const customerId = req.params.id;
    
    try {
        await customerModel.findByIdAndRemove(customerId);
        return res.json({
            success: true,
            message: "Customer removed successfully"
        });
    } catch (error) {
        res.status(500).send(res.json({
            success: false,
            message: "Customer was not deleted.",
            stackTrace: error.message,
            exception: "DeleteCustomerException"
        }));
    }
}

module.exports = customerMethods;