const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    access_token: {
        type: String
    },
    role_id: {
        type: Schema.Types.ObjectId, ref: 'Role'
    },
    github_id: {
        type: Number
    }
})

const User = mongoose.model('user', userSchema);

module.exports = User;