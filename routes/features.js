const express = require('express');
const router = express.Router({mergeParams: true});

const {index} = require('../controllers/featuresController.js');

router.get('/', index)

module.exports = router;