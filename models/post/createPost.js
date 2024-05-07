const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
   posts:[
    {
  caption: {
    type: String,
    required: true
  },
  imagePath: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  likers: {
    type: [String],
    default: []
  },
  comments: [{
    userId: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
}
   ]


});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
