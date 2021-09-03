const { Schema , model } = require('mongoose');
require('dotenv').config();

const technicianSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        unique: true
    },
    lastName: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: new Date()
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    startWorkingDate: {
        type: Date
    },
    employeeRecord: {
        type: String,
        required: true
    }
});

module.exports = model('Technician' , technicianSchema);