//  ---------packages imports ------------
require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

// database
const connectDB = require("./db/connect");

//product router
const productRouter = require('./routes/productsRoute')


//routes

//error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");



//  ---------implementation------
app.use(express.json())
//home route
app.get("/", (req, res) => {
  res.send('<h1>File Upload</h1><a href="/api/v1/upload">Upload</a>');
});


app.use('/api/v1/products', productRouter)

//middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// -------------Server spinup----------
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();