const express=require('express')
 const router=express.Router();
const cloudinary=require('cloudinary').v2
 const Post=require('../models/post/createPost')
  const multer=require('multer');
   const Upload =require("../cldnry")
    const mongoose =require('mongoose')
   const Like = require('../models/post/like');
   const Comment =require("../models/post/comment")
   const { ObjectId } = require('bson');
    const jwt=require('jsonwebtoken')
     const User=require("../models/Signup")

 cloudinary.config({ 
    cloud_name: 'dnwo3a50t', 
    api_key: '371286194292841', 
    api_secret: 'xZ8B7FhDkVDiLhYjwldKfvKAIs4' 
  });
  var uploader=multer({
    storage:multer.diskStorage({}),
    limits:{fieldSize:5000000}
 });

 router.post("/Post",uploader.single("file") ,async(req,res)=>{
    try{

         const{caption}=req.body;
         if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
            return res.status(401).json({ error: "Unauthorized" });
        }

         const token = req.header('Authorization').replace('Bearer ', '');
         let decodedToken;
         try {
             decodedToken = jwt.verify(token, 'SocialX');
         } catch (err) {
             // If token is invalid or expired
             return res.status(401).json({ error: "Invalid token" });
         }
        const userId = decodedToken.userId;

        // Check if user is authenticated
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }



         const upload=await Upload.uploadfile(req.file.path);
        //   const post = new Post({ caption, imagePath: upload.secure_url })
               
        //    await post.save();
           
        //     res.status(201).json(post)
        const newPost = { caption, imagePath: upload.secure_url };
        await User.findOneAndUpdate(
            { _id: userId },
            { $push: { posts: newPost } },
            { new: true }
        );

        // Save the updated user document
        const user = await User.findById(userId);
        await user.save();

        res.status(201).json(newPost);
           

    }
     catch(err){
        console.log(err)
     }
 })

 //loke post 
 router.post('/post/:postId/like', async (req, res) => {
    const { userId } = req.body;
    const postId =   new ObjectId(req.params.postId);
    // const postId = req.params.postId;
  
    try {
      const post = await Post.findById(postId);
    
      post.likes += 1;
      post.likers.push(userId);
      await post.save();
  
      res.status(200).json({ message: 'Post liked successfully', post });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to like post' });
    }
  });



  router.post('/post/:postId/comment', async (req, res) => {
    const { userId, text } = req.body;
    const postId = new ObjectId(req.params.postId);
  
    try {
      const post = await Post.findById(postId);
      post.comments.push({ userId, text, });
      await post.save();
  
      res.status(200).json({ message: 'Comment added successfully', post });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to add comment' });
    }
  });
  

  
  
  
module.exports=router;
 