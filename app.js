const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
let database = require('./db')
//database
database.connectDb()

//Listen on port
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log('listening on port 5000'))

// dev
app.use(morgan('dev'));
app.use(cors());

// require all routes
app.use(require('./routes'))

module.exports = app