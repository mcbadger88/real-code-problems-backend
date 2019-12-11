const express = require('express');
const router = express.Router();

const {index, create, show, update, destroy, result} = require('../controllers/attemptsController.js');

router.get('/', index);
router.post('/', create);
router.get('/:id', show);
router.put('/:id', update);
router.delete('/:id', destroy);
router.put('/:id/result', result)

module.exports = router;