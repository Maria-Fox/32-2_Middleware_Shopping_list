let { items } = require("./fakeDB");
// Using an array for storage, this will be cleared each time the server restarts
const express = require("express");
const GlobalError = require("./globalError");
const itemRoutes = require("./itemRoutes");

const app = express();

// middleware - PREFIX for routes within ...
app.use(express.json());
app.use("/items", itemRoutes);

// // // // // // // // // // // // // // // // // // // // // // // // // // // //

// app.get("/", function (req, res, next) {
//   return res.json(items);
// });

// // // // // // // // // // // // // // // // // // // // // // // // // // // //

// 404 error

app.use(function (req, res, next) {
  return new GlobalError("Not found", 404);
  // next(err);
});

// generic error handler

app.use(function (err, req, res, next) {
  let status = err.status || 500;
  let message = err.message || "Something went wrong- please try again.";

  return res.json({ error: err.message });
});

// // // // // // // // // // // // // // // // // // // // // // // // // // // //

// starts our server, reads as "express.listen()" - to test app we move server out/ into server.js. DO NOT HAVE AN ACTIVE SERVER WHEN TESTING
// app.listen(5000, function () {
//   console.log("Listening on port 5000");
// });

// only exporting express()
module.exports = app;
