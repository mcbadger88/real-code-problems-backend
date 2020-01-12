const router = require('express').Router()
const passport = require('passport')
const passportAuth = require('../authentication/passport')

//Import all functions from users controller
const { gitAuthentication, callback, currentUser, logout} = require('../controllers/usersController.js');

//GITAUTH ROUTES
//user gitauth (login route)
router.get('/gitauth', passport.authenticate('github', {scope: ['profile']}), gitAuthentication)
//user callback route (redirects after successful login). You will recieve userID in the route.
router.get('/signin/callback', passport.authenticate('github', {scope: ['profile']}), callback)
// get current user
router.get('/current', currentUser)
//user log out
router.get('/logout', logout)

module.exports = router;