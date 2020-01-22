const mongoose = require('mongoose');

const dbOptions = { useNewUrlParser: true, useUnifiedTopology: true }

const connectDb = () => {
  mongoose.connect(process.env.PROD_DB_URL, dbOptions, (err) => {
    if (err) {
      console.log('not connected ❌')
      console.log(err)
    } else {
      console.log('connected ✅')
    }
})}

module.exports = {connectDb};