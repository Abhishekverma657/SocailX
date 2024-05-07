const express=require('express');
 const router =express.Router();
  const User=require("../models/Signup")
  const { ObjectId } = require('bson');
  const jwt=require('jsonwebtoken')
  const Post=require('../models/post/createPost')
   

  router .get("/feed",async(req,res)=>{
    try{
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

    // Get the user's information from the database using their ID


    const currentUser = await User.findById(userId).populate('following', 'posts');

        // Combine posts of the users the current user is following
        let posts = [];
        currentUser.following.forEach(user => {
            posts = posts.concat(user.posts);
        });

        // Sort the combined posts by createdAt date
        posts.sort((a, b) => b.createdAt - a.createdAt);

        // Limit to 10 posts for example
        posts = posts.slice(0, 10);

        res.status(200).json({ Posts:posts});



    }
     catch(err){
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });

     }
  })
  

 module.exports=router