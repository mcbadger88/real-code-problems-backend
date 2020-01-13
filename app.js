const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
let database = require('./db')
const passport = require('passport')
const cookieSession = require('cookie-session')

//database
database.connectDb()

//use cors
app.use(cors({
    credentials: true,
    origin: process.env.CORS_URL // 'http://localhost:3000'
}));

//Use session cookies on each route.
app.use(cookieSession({
    // One day maximum age, in milliseconds.
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_ENCRYPTION_KEY]
}))

//Initialize passport and cookie sessions.
app.use(passport.initialize());
app.use(passport.session());

//Listen on port
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`listening on port ${PORT}`))

// dev
app.use(morgan('dev'));
app.use(cors());

// require all routes
app.use(require('./routes'))

module.exports = app