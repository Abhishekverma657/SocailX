const mongoose = require('mongoose');

// Connection URI
const uri = 'mongodb://127.0.0.1:27017/SocialX';

// Connect to MongoDB
 mongoose.connect(uri, { 
    
})
  .then(() => {
    console.log('Connected to MongoDB');
    // Perform operations using mongoose
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
 module.exports=mongoose;