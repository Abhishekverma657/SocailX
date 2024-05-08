const mongoose = require('mongoose');

<<<<<<< HEAD
// // Connection URI

 const uri ='mongodb+srv://Abhishek:Abhi8898@cluster0.ddqlz.mongodb.net/?retryWrites=true&w=majority&appName=SocialX'
=======
// Connection URI
const uri = 'mongodb+srv://Abhishek:Abhi8898@cluster0.ddqlz.mongodb.net/?retryWrites=true&w=majority&appName=SocialX';
>>>>>>> 1d52933ee890fd1ac092f6b88e6d6420950b172a

// Connect to MongoDB
 mongoose.connect(uri, { 
  connectTimeoutMS :20000
    
})
  .then(() => {
    console.log('Connected to MongoDB');
    // Perform operations using mongoose
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
 module.exports=mongoose;
