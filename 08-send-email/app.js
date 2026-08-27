//  ---------packages imports ------------
require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

//routes
const sendEmail = require('./controllers/sendEmail')

//error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");



//  ---------implementation-----------

// able json data format
app.use(express.json())

//routes
//home route
app.get("/", (req, res) => {
  res.send('<h1>Email Project</h1><a href="/send">send email</a>');
});
app.get('/send', sendEmail )

//middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// -------------Server spinup ----------
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, console.log(`Server is listening on ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();