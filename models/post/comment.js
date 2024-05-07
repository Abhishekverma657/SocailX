const { text } = require('body-parser');
const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
     text:{
        type :String ,
        required:true
     }
});

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;
