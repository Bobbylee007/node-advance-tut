const path = require("path");
const CustomError =require('../errors')
const { StatusCodes } = require("http-status-codes");

const uploadProductImage = async (req, res) => {
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

module.exports = uploadProductImage;
