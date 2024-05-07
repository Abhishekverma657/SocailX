const mongoose=require('mongoose')
 const UserSchema= new mongoose.Schema({
    firstname:{
        type:String ,
         required:true,
        required: [true,"Please provide your First Name"]

    },
    lastname:{
       type : String  
   } ,
    email : { 
       type: String,
       unique:true,
       lowercase:true,
       required: [true,"Please provide your email"]
     } ,
     password: {
         type: String,
         require: [true,"Please provide your    "]
    } ,
    imageUrl: {
        type: String
    },
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
     posts:[]
     
    
   


 })
  const User =mongoose.model('User',UserSchema);
  module.exports=User