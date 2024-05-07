const mongoose = require('mongoose');

// // Connection URI
// const uri = 'mongodb+srv://Abhishek:Abhi8898@cluster0.ddqlz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
// const uri='mongodb+srv://Abhishek:Abhi8898@cluster0.ddqlz.mongodb.net/'
 const uri ='mongodb+srv://Abhishek:Abhi8898@cluster0.ddqlz.mongodb.net/?retryWrites=true&w=majority&appName=SocialX'

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