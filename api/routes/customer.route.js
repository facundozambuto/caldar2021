const express = require('express');
const router = express.Router();
const { addCustomer, getCustomerById, getAllCustomers, updateCustomer, deleteCustomer } = require('../controllers/customer.controller');

const { verifyToken } = require('../controllers/verify.controller');

router.get('/', verifyToken, getAllCustomers);
router.get('/:id', verifyToken, getCustomerById);
router.put('/:id', verifyToken, updateCustomer);
router.delete('/:id', verifyToken, deleteCustomer);
router.post('/', verifyToken, addCustomer);

module.exports = router;