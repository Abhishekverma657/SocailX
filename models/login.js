const  mongoose =require('mongoose'); 
 const loginSchema= mongoose.Schema({
     email:{
        type:String ,
         require:[true,"please provide email"]
     },
     password:{
         type :String,
          require:[true,"Please provide your password"]

     }


 })
 loginSchema.methods.isValidPassword = function(password) {
    return password === this.password;
};

  const loginUser=mongoose.model("User",loginSchema);
   module.exports=loginUser;