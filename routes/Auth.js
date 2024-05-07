const express =require('express')
 const router=express.Router();
  const mongoose=require('mongoose')
  const  User=require("../models/Signup")
  const cloudinary = require('cloudinary').v2;
   const multer=require('multer')
   const Upload=require("../cldnry")
    const jwt=require('jsonwebtoken')
      
//  router.get("/test",(req,res)=>{
//     res.send("this is rutert checking ");
//  })



cloudinary.config({ 
    cloud_name: 'dnwo3a50t', 
    api_key: '371286194292841', 
    api_secret: 'xZ8B7FhDkVDiLhYjwldKfvKAIs4' 
  });
  var uploader=multer({
    storage:multer.diskStorage({}),
    limits:{fieldSize:5000000}
 });

 



router.post("/SignUp", uploader.single('file') ,async(req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;

       
        const upload =await  Upload.uploadfile(req.file.path);

        
        const user = new User({ firstname, lastname, email, password, imageUrl: upload.secure_url });
        await user.save({ wtimeout: 20000 });

        res.status(200).json({ message: 'User registered successfully', data: user });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }

});
  

 ///// signup 
//   router.post("/SignUp",async(req,res)=>{
//      try{
//          const { firstname ,lastname,email, password}=req.body;
//          const user=  await new  User({firstname, lastname, email,password})
//          await    user.save();
       

//         res.status(200).json({ message: 'User registered successfully' , data : user})
     
      
    
    
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
    
//   })
   ///// find all user list 
   router.get("/alluser",async(req,res)=>{
    const users=await User.find()
    if(!users){
return res.status(404).json({msg:"No Users found"});
}
    res.status(200).json(users);


   })

   ///// logIn
    router.post("/login",async(req,res)=>{
        try {
            const { email, password } = req.body;
            // Check if email and password are provided
            if (!email || !password) {
                return res.status(400).json({ error: "Email and password are required" });
            }
    
            // Find user by email
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({ error: "Invalid email or password" });
            }
    
            // Check if password is correct
            const isValidPassword = await  user.password===password;
            if (!isValidPassword) {
                return res.status(401).json({ error: "Invalid email or password" });
            }
    
            // Generate JWT token for authentication
            // const token = user.generateAuthToken();
            const token = jwt.sign({ userId: user._id }, 'SocialX', { expiresIn: '1D' });
    
            res.status(200).json({ message: "Login successful",user,token });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
      

    })
    
    




  module.exports=router;