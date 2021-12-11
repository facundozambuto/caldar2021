const { Schema, model, Mongoose } = require('mongoose');
const mongoose = require('mongoose');
require('dotenv').config();

const serviceSchema = new Schema({
    customer: {
        type: String,
        required: true,
    },
    technician: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Technician'
    },
    boiler: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Boiler'
    },
    created_at: {
        type: Date,
        default: new Date()
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    allDay: {
        type: Boolean,
        required: false
    },
    resource: {
        type: Boolean,
        required: false
    },
    title: {
        type: String,
        required: true,
    }
});

module.exports = model('Service' , serviceSchema);