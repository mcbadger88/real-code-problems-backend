const express = require('express');
const router = express.Router();

const {index, show} = require('../controllers/featuresController.js');

console.log('inside the features routes')

router.get('/all', index);
router.get('/:id', show)

module.exports = router;