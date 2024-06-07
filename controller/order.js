const Order = require("../models/order.js");
const Cart = require("../models/cart.js");
const Product = require("../models/product.js");
const User = require("../models/user.js");

async function add(req, res) {
  const cssfiles = [
    { css: "/css/order.css" },
    { css: "/css/main.css" },
    { css: "/css/home.css" },
  ];
  const scripts = [{ script: "/js/addingOrderHandler.js" }];
  res.render("order", { cssfiles, scripts });
}
async function getAllOrder(req, res) {
  const scripts = [{ script: "/js/orderListHandler.js" }];
  const cssfiles = [
    { css: "/css/main.css" },
    { css: "/css/home.css" },
    { css: "/css/orders.css" },
  ];
  res.render("listOrders", { cssfiles, scripts });
}
async function createOrder(req, res) {
  const { userId } = req.params;
  const { phone, name, address } = req.body;

  try {
    // Fetch the user's cart items
    const cartItems = await Cart.find({ user: userId }).populate("product");

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).send("Cart is empty");
    }

    // Calculate the total cost
    const totalCost = cartItems.reduce(
      (acc, item) => acc + item.product.salePrice * item.quantity,
      0
    );

    // Create the order items array
    const items = cartItems.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
    }));

    // Create the new order
    const newOrder = new Order({
      user: userId,
      phone,
      name,
      address,
      items,
      total: totalCost,
    });

    // Save the new order
    await newOrder.save();

    // Clear the user's cart
    await Cart.deleteMany({ user: userId });

    res.status(200).send("Order created successfully");
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).send("Internal Server Error");
  }
}
module.exports = { add, createOrder, getAllOrder };
