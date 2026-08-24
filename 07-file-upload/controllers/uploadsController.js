const path = require("path");
const CustomError =require('../errors')
const { StatusCodes } = require("http-status-codes");
const cloudinary = require('cloudinary').v2
const fs = require('fs')



const uploadProductImageLocal = async (req, res) => {
  //check if there is a file exists
  //check for file format
  //check size of the file
  
  // console.log(req.files);

if(!req.files){
  throw new CustomError.BadRequestError("No File Uploaded");
}

  const productImage = req.files.image; //grab the image from the request body

  if(!productImage.mimetype.startsWith('image')){
    throw new CustomError.BadRequestError('please upload an image')
  }
const maxSize = 2524 * 1024; // 1MB in bytes
  if(productImage.size > maxSize){
    throw new CustomError.BadRequestError('please upload image smaller then 2.5MB')
  }

  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${productImage.name}`, // set the path to the image
  );
  await productImage.mv(imagePath); // move the image to the path

  return res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${productImage.name}` } }); // return the image path to the client as json
};

const uploadProductImage= async (req,res)=>{
  // console.log(req.files.image);
  
 const result = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
   use_filename: true,
   folder: "file-uploadTut",
 });
//  console.log(result);
fs.unlinkSync(req.files.image.tempFilePath) // remove the temp file after upload
return res.status(StatusCodes.OK).json({image:{src:result.secure_url}})
}
module.exports =uploadProductImageLocal
module.exports = uploadProductImage;
