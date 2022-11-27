const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const port = 8000;

express()
  // This line will allow our server to auto-parse the body, which arrives as as a JSON string, to an object that we can use. (The same as JSON.parse())
  // The upload limit is set to fix errors I was getting with file uploads
  .use(express.json({ limit: "10mb" }))
  .use(express.urlencoded({ extended: true, limit: "10mb" }))

  // Helps with CORS error.
  .use(helmet())

  // Provides console information regarding the incoming HTTP request
  // The 'tiny' argument formats the message to only show some of information
  .use(morgan("tiny"))

  .get("/hello", (req, res) => {
    res.status(200).json({ status: 200, message: "Hello World!" });
  })

  .listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
