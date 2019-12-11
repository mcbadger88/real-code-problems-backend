const Feature = require('../models/Feature')

const index = async (req, res) => {
    try{
        res.send('index - features')

    } catch(error){
        res.status(404).send(error)
    }
}

module.exports = {
    index
}