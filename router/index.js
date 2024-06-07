const UserRoute = require("./user.js");
const UserController = require("../controller/user.js");
const ProductRoute = require("./product.js");
const OrderRoute = require("./order.js");
const CartRoute = require("./cart.js");
const Product = require("../models/product.js");
const { MultipleMongooseObject } = require("../utils/Mongoose.js");
function route(app) {
  app.use("/user", UserRoute);
  app.post("/login", UserController.login);
  app.post("/sign-up", UserController.create);
  app.use("/products", ProductRoute);
  app.use("/cart", CartRoute);
  app.use("/orders", OrderRoute);
  app.get("/", async (req, res) => {
    const cssfiles = [
      { css: "/css/main.css" },
      { css: "/css/home.css" },
      { css: "/css/product-details.css" },
    ];
    let products = await Product.find();
    products = MultipleMongooseObject(products);
    res.render("home", { cssfiles, products });
  });
}
module.exports = route;
