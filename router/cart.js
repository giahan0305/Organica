const express = require("express");
const CartRoute = express.Router();
const {
  get,
  add,
  deletecart,
  changeQuantity,
} = require("../controller/cart.js");

// Route to add a product to the cart
CartRoute.post("/add", add);
// Route to get cart items for a specific customer
CartRoute.get("/:userId", get);
// Route to delete a product to the cart
CartRoute.delete("/:cartItemId", deletecart);
CartRoute.put("/:cartItemId", changeQuantity);
module.exports = CartRoute;
