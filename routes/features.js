const express = require('express');
const router = express.Router({mergeParams: true});

const {index} = require('../controllers/featuresController.js');

console.log('inside the features routes')

router.get('/', index)

module.exports = router;