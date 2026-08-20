//  ---------packages imports ------------
require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
// database
const connectDB = require("./db/connect");

//product router
const productRouter = require('./routes/productsRoute')


//routes

//error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");



//  ---------implementation-----------

app.use(express.static("./public")); // serve static files from the public folder
app.use(express.json())
app.use(fileUpload())
//home route
app.get("/", (req, res) => {
  res.send('<h1>File Uploads</h1><a href="/api/v1/uploads">Uploads</a>');
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