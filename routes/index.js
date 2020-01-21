const express = require('express');
const router = express.Router();

const multer = require('multer')
//Multer middleware
const multerMiddleware = multer({ storage: multer.memoryStorage() }).single('file')

// Importing all route files
const attempts = require('./attempts');
const candidates = require('./candidates');
const challenges = require('./challenges');
const features = require('./features');
const users = require('./users');
const seed = require('./seed');

// Defining paths for each route file.
router.use('/candidates', express.json(), candidates);
router.use('/challenges', express.json(), challenges)
router.use('/challenges/:id/features', features)
router.use('/:idtype/:id/attempts', express.json(), attempts)
router.use('/seed', express.json(), seed)

router.use('/user', users)

module.exports = router;