const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const featureSchema = new Schema({
    title: {
        type: String, 
        required: true
    },
    number: {
        type: Number
    },

    scenarios: {
        type: [{
            scenarioTitle: {
                type: String
            },
            testLines: [
                {type: Schema.Types.ObjectId, ref: 'TestLine'}
            ]
        }]
    }

})

const Feature = mongoose.model('feature', featureSchema);

module.exports = Feature;