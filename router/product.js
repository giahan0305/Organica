// routes/product.js
const express = require("express");
const ProductRoute = express.Router();
const ProductController = require("../controller/product");

ProductRoute.get("/search", ProductController.searchProducts);
ProductRoute.get("/:slug", ProductController.getProductDetail);
ProductRoute.get("/", ProductController.getAllProducts);

module.exports = ProductRoute;
