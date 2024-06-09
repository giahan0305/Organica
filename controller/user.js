const User = require("../models/user");
const Order = require("../models/order.js");

class UserController {
  async getAllOrder(req, res) {
    const customerId = req.params.customerId;

    try {
      const orders = await Order.find({ user: customerId }).populate(
        "items.product"
      );
      if (!orders) {
        return res
          .status(404)
          .send({ message: "No orders found for this customer" });
      }
      res.status(200).send(orders);
    } catch (error) {
      res.status(500).send({ message: "Server error", error });
    }
  }
  async index(req, res) {
    try {
      const users = await User.find({});
      res.status(200).render("users", { users });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async create(req, res) {
    try {
      const { name, email, password } = req.body;
      const user = await User.findOne({ email });
      if (user) {
        return res
          .status(500)
          .json({ message: "This email have already sign in." });
      }
      const newUser = new User({ name, email, password });
      await newUser.save();
      res.redirect("/");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, pswd } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isMatch = await user.comparePassword(pswd);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      res.status(200).json({ message: "Login successful", user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new UserController();
