const cloudinary = require('cloudinary').v2;

 
          
cloudinary.config({ 
  cloud_name: 'dnwo3a50t', 
  api_key: '371286194292841', 
  api_secret: 'xZ8B7FhDkVDiLhYjwldKfvKAIs4' 
});
const uploadfile = async (filePath) => {
    try{
        const result =await cloudinary.uploader.upload(filePath);
        console.log(result);
         return result ;

    }
     catch(error){
        console.log(error)
     }
}
 module.exports={
    uploadfile
 }
    