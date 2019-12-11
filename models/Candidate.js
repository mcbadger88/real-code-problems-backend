const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const candidateSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    firsname: {
        type: String
    },
    lastname: {
        type: String
    },
    linkedin: {
        type: String
    },
    github: {
        type: String
    },
    bio: {
        type: String
    },
    // image: {
        
    // },
    attempts: [
        {type: Schema.Types.ObjectId, ref: 'Attempt'}
    ],
    username: {
        type: String,
        unique: true
    }
})

const Candidate = mongoose.model('candidate', candidateSchema);

module.exports = Candidate;