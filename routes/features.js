const express = require('express');
const router = express.Router();

const {showWithTestLines} = require('../controllers/featuresController.js');

router.get('/:featureid', showWithTestLines)

module.exports = router;