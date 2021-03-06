const express = require('express')
const router = express.Router();

const {index, create, show, update, destroy, lookup} = require('../controllers/candidatesController.js');

router.get('/', index);
router.post('/', create);
router.get('/:id', show);
router.put('/:id', update);
router.delete('/:id', destroy);
router.get('/user/:id', lookup);


module.exports = router;