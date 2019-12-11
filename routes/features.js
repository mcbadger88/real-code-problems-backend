const express = require('express');
const router = express.Router();

const {index} = require('../controllers/challengesController.js');

router.get('/', index);

module.exports = router;