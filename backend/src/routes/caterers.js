const express = require('express');
const { getCaterers, getCatererById, createCaterer } = require('../controllers/caterers');
const { validateCaterer } = require('../middlewares/validation');

const router = express.Router();

router.get('/', getCaterers);
router.get('/:id', getCatererById);
router.post('/', validateCaterer, createCaterer);

module.exports = router;
