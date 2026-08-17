const Product = require("../models/product");
const { StatusCode } = require("http-status-codes");

const uploadProductImage = async (req, res) => {
  res.send("upload product image");
};

module.exports =  uploadProductImage;
