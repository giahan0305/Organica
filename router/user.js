// routes/user.js
const express = require("express");
const UserRoute = express.Router();
const UserController = require("../controller/user.js");

// // Define route to check user collection
// UserRoute.get("/", userController.index.bind(UserController));

// Additional route to fetch user collection contents
UserRoute.get("/create", UserController.create);
UserRoute.get("/:customerId", UserController.getAllOrder);
UserRoute.get("/", UserController.index);

module.exports = UserRoute;
