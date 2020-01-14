const express = require('express');
const router = express.Router({mergeParams: true});

const {index, create, update, destroy, result} = require('../controllers/attemptsController.js');

router.get('/', index);
router.post('/', create);
router.put('/:attemptid', update);
router.delete('/:id', destroy);
router.put('/:id/result', result)

module.exports = router;