const express = require("express");
const OrderRoute = express.Router();
const { add, createOrder, getAllOrder } = require("../controller/order.js");

// // Route to add a product to the cart
OrderRoute.post("/:userId", createOrder);
// // Route to get cart items for a specific customer
OrderRoute.get("/", getAllOrder);
// // Route to delete a product to the cart
// CartRoute.delete("/:cartItemId", deletecart);
OrderRoute.get("/add", add);
module.exports = OrderRoute;
