const express = require('express');
const router = express.Router();
const { addBoiler, getBoilderByBoilerId, getAllBoilers, updateBoiler, deleteBoiler } = require('../controllers/boiler.controller');

const { verifyToken } = require('../controllers/verify.controller');

router.get('/', verifyToken, getAllBoilers);
router.get('/:id', verifyToken, getBoilderByBoilerId);
router.put('/:id', verifyToken, updateBoiler);
router.delete('/:id', verifyToken, deleteBoiler);
router.post('/', verifyToken, addBoiler);

module.exports = router;