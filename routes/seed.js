const express = require('express');
const router = express.Router();

const {seedAll, resetDb} = require('../controllers/seedControllerForPresentation.js');

router.post('/all', seedAll)
router.post('/reset', resetDb)

module.exports = router;