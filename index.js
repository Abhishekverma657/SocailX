const expresss=require('express')
 const app= expresss();
  const multer=require('multer')
  const router=require('./routes/Auth');
  const Createpost=require('./routes/createPost');
  const mongoose=require("./Db")
  const Upload =require('./cldnry')
  const Follow=require("./routes/FollowSystem")
   const Feed=require("./routes/feed")

   app.use(expresss.json())

/////multer set up
 var uploader=multer({
    storage:multer.diskStorage({}),
    limits:{fieldSize:5000000}
 });
 app.post("/file",uploader.single("file") , async (req,res)=>{
    try { const upload =await  Upload.uploadfile(req.file.path);
    //   var store= new 
      res.send({
        msg:"succefully ",
        url :upload.secure_url
     })
}catch(err){

    console.log(err);
}

 })




  app.get("/",(req,res)=>{
    res.send("This is testing mode")
  })
   app.use("/user",Feed)

   app.use("/user",Follow)


   app.use("/create",Createpost)
   

   
   app.use("/auth",router);
  app.listen(1323,()=>{
    console.log("server is runnig ")
  })