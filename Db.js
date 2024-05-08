const mongoose = require('mongoose');

 
 

 const uri ='mongodb+srv://Abhishek:Abhi8898@cluster0.ddqlz.mongodb.net/SocialX?retryWrites=true&w=majority&appName=Cluster0'
 
 
 

// Connect to MongoDB
 mongoose.connect(uri,

  )
  .then(() => {
    console.log('Connected to MongoDB');
    // Perform operations using mongoose
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
 module.exports=mongoose;
