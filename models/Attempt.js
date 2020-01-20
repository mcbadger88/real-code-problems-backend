const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attemptSchema = new Schema({
    status: { 
        type: String,
        enum : ['STARTED', 'SUBMITTED', 'PASSED', 'FAILED'],
        default: 'STARTED'
    },
    candidate_id: {
        type: Schema.Types.ObjectId, ref: 'Candidate'
    },
    challenge_id: {
        type: Schema.Types.ObjectId, ref: 'Challenge'
    },
    submission_file: {
        type: String
    },
    results_log: {
        type: String
    },
    uuid: {
        type: String,
    }
},
{
    timestamps: true
})

const Attempt = mongoose.model('attempt', attemptSchema);

module.exports = Attempt;