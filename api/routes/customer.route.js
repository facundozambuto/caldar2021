const express = require('express');
const router = express.Router();
const { addCustomer, getCustomerById, getAllCustomers, updateCustomer, deleteCustomer } = require('../controllers/customer.controller');

router.get('/', getAllCustomers);
router.get('/:id', getCustomerById);
router.put('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);
router.post('/', addCustomer);

module.exports = router;