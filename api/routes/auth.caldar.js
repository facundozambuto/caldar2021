const express = require('express');
const router = express.Router();
const {signin , signup , confirmToken} = require('../controllers/auth.controller');

router.post('/signin' , signin);
router.post('/signup' , signup);
router.post('/verify' , confirmToken);

module.exports = router;