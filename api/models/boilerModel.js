const { Schema , model } = require('mongoose');
require('dotenv').config();

const boilerSchema = new Schema({
    boilerId: {
        type: String,
        required: true,
        unique: true
    },
    temperature: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: new Date()
    },
    madeDate: {
        type: Date,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    }
});

module.exports = model('Boiler' , boilerSchema);