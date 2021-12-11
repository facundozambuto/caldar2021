const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');

// Body Parsers
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Others
app.use(cors());
app.use(helmet());

// Routes
app.use(require('./routes/auth.caldar'));
app.use('/technicians', require('./routes/technician.route'));
app.use('/boilers', require('./routes/boiler.route'));
app.use('/customers', require('./routes/customer.route'));
app.use('/services', require('./routes/service.route'));

module.exports = app;