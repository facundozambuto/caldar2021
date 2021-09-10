const express = require('express');
const router = express.Router();
const { addBoiler, getBoilderByBoilerId, getAllBoilers, updateBoiler, deleteBoiler } = require('../controllers/boiler.controller');

//const { verifyToken } = require('../controllers/verify.controller')

router.get('/', getAllBoilers);
router.get('/:id', getBoilderByBoilerId);
router.put('/:id', updateBoiler);
router.delete('/:id', deleteBoiler);
router.post('/', addBoiler);

module.exports = router;