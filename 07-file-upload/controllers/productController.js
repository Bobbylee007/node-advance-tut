const Product = require("../models/product");
const { StatusCode } = require("http-status-codes");

const createProducts = async (req, res) => {
  res.send("create product");
};

const getAllProducts = async (req, res) => {
  res.send("list of product");
};

module.exports = {createProducts, getAllProducts };
