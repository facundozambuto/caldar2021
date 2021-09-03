const express = require('express');
const router = express.Router();
const { addTechnician , deleteTechnician , getAllTechnicians , getTechnicianByEmployeeRecord , updateTechnician } = require('../controllers/technician.controller');

const { verifyToken } = require('../controllers/verify.controller')

router.get('/' , verifyToken , getAllTechnicians);
router.get('/:id' , verifyToken , getTechnicianByEmployeeRecord);
router.put('/:id' , verifyToken , updateTechnician);
router.delete('/:id' , verifyToken , deleteTechnician);
router.post('/' , verifyToken , addTechnician);

module.exports = router;