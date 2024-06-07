const Product = require("../models/product");
const {
  SingleMongooseObject,
  MultipleMongooseObject,
} = require("../utils/Mongoose");
async function getProductDetail(req, res) {
  const cssfiles = [
    { css: "/css/main.css" },
    { css: "/css/home.css" },
    { css: "/css/product-details.css" },
  ];
  const scripts = [{ script: "/js/product.js" }];
  const { slug } = req.params;
  let product = await Product.findOne({ _id: slug });
  if (!product) {
    res.status(404).json("Notfound");
  } else {
    product = SingleMongooseObject(product);
    res.render("products", { cssfiles, product, scripts });
  }
}

async function getAllProducts(req, res) {
  const cssfiles = [
    { css: "/css/main.css" },
    { css: "/css/home.css" },
    { css: "/css/product-details.css" },
  ];
  try {
    const products = await Product.find({});
    res.return("home", { cssfiles, products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function searchProducts(req, res) {
  const cssfiles = [{ css: "/css/main.css" }, { css: "/css/home.css" }];

  const { q } = req.query;
  const searchValue = q.toLowerCase();
  console.log(searchValue);
  try {
    let products = await Product.find({
      name: { $regex: new RegExp(searchValue, "i") }, // 'i' for case-insensitive
    });
    products = MultipleMongooseObject(products);
    console.log(products);

    res.render("search", { cssfiles, searchValue, products });
  } catch (e) {
    res.status(200).json(e.message);
  }
}
module.exports = {
  getProductDetail,
  getAllProducts,
  searchProducts,
};
