const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const challengeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    zipFileLocation: {
        type: String
    },
    active: {
        type: Boolean,
        default: true
    },
    features: [
        {type: Schema.Types.ObjectId, ref: 'Feature'}
    ],
    externalIdentifier: {
        type: String
    }
})

const Challenge = mongoose.model('challenge', challengeSchema);

module.exports = Challenge;