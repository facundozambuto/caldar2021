const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// Body Parsers
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Others
app.use(cors());
app.use(helmet());
app.use(morgan());

// Routes
app.use(require('./routes/auth.caldar'));
app.use('/technicians' , require('./routes/technician.route'));

module.exports = app;