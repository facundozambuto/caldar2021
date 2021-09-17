const { Schema , model } = require('mongoose');
require('dotenv').config();

const customerSchema = new Schema({
    customerId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    dni: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: new Date()
    }    
});

module.exports = model('Customer' , customerSchema);