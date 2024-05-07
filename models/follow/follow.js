const mongoose=require('mongoose')
 const followSchema=mongoose.Schema({
    followUserId:{
        type :mongoose.Schema.Types.ObjectId,  // reference to the user who is being followed
        required:true
    }

 })
  module.exports=mongoose.model("Follow",followSchema);