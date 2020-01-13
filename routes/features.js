const express = require('express');
const router = express.Router();

const {showWithTestLines} = require('../controllers/featuresController.js');

console.log('inside the features routes')

router.get('/:featureid', showWithTestLines)



module.exports = router;