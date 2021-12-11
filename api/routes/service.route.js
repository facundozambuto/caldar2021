const express = require('express');
const router = express.Router();
const { addService, getServiceByServiceId, getAllServices, updateService, deleteService } = require('../controllers/service.controller');

const { verifyToken } = require('../controllers/verify.controller');

router.get('/', verifyToken, getAllServices);
router.get('/:id', verifyToken, getServiceByServiceId);
router.put('/:id', verifyToken, updateService);
router.delete('/:id', verifyToken, deleteService);
router.post('/', verifyToken, addService);

module.exports = router;