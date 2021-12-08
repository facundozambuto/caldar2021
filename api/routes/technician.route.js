const express = require('express');
const router = express.Router();
const { addTechnician , deleteTechnician , getAllTechnicians , getTechnicianByEmployeeRecord , updateTechnician } = require('../controllers/technician.controller');

const { verifyToken } = require('../controllers/verify.controller');

router.get('/', getAllTechnicians);
router.get('/:id', getTechnicianByEmployeeRecord);
router.put('/:id', updateTechnician);
router.delete('/:id', deleteTechnician);
router.post('/', addTechnician);

module.exports = router;