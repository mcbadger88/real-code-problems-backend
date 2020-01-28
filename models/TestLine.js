const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testLineSchema = new Schema({
    testString: {
        type: String
    },
    description: {
        type: String
    },
    helperImage: {
        type: String
    },
    lineNumber: {
        type: Number,
        required: true
    }
})

const TestLine = mongoose.model('testLine', testLineSchema);

module.exports = TestLine;