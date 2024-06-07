const Cart = require("../models/cart");
const User = require("../models/user");
const Product = require("../models/product");

async function get(req, res) {
  const { userId } = req.params;

  try {
    // Find the cart items for the user and populate product details
    const cartItems = await Cart.find({ user: userId }).populate("product");

    if (!cartItems) {
      return res.status(404).send("Cart not found");
    }

    // Find user details
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(200).json({ user, cartItems });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).send("Internal Server Error");
  }
}

async function add(req, res) {
  const { userId, productId, quantity } = req.body;

  if (!userId || !productId || !quantity) {
    return res.status(400).send("Missing required fields");
  }

  try {
    // Check if the cart item already exists
    let cartItem = await Cart.findOne({ user: userId, product: productId });

    if (cartItem) {
      // If the item exists, update the quantity
      cartItem.quantity += parseInt(quantity, 10);
    } else {
      cartItem = new Cart({
        user: userId,
        product: productId,
        quantity: quantity,
      });
    }

    const savedCartItem = await cartItem.save();
    res.status(201).json(savedCartItem);
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).send("Internal Server Error");
  }
}

async function deletecart(req, res) {
  const { cartItemId } = req.params;

  try {
    const deletedCartItem = await Cart.findByIdAndDelete(cartItemId);

    if (!deletedCartItem) {
      return res.status(404).send("Cart item not found");
    }

    res.status(200).json({ message: "Cart item deleted successfully" });
  } catch (error) {
    console.error("Error deleting cart item:", error);
    res.status(500).send("Internal Server Error");
  }
}
async function changeQuantity(req, res) {
  const { cartItemId } = req.params;
  const { quantity } = req.body;

  if (!quantity) {
    return res.status(400).send("Missing required field: quantity");
  }

  try {
    const updatedCartItem = await Cart.findByIdAndUpdate(
      cartItemId,
      { quantity: quantity },
      { new: true }
    );

    if (!updatedCartItem) {
      return res.status(404).send("Cart item not found");
    }

    res.status(200).json(updatedCartItem);
  } catch (error) {
    console.error("Error updating cart item:", error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = { get, add, deletecart, changeQuantity };
