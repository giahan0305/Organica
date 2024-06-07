const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Cart schema
const cartSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  product: {
    type: mongoose.Types.ObjectId,
    ref: "Product", // Reference to the Product model
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1, // Ensures quantity is at least 1
  },
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
