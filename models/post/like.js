const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    }
});

const Like = mongoose.model('Like', LikeSchema);
module.exports = Like;
