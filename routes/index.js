var express = require("express");
var router = express.Router();
var Car = require("../models/CarModels");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/* GET shopping cart page. */
router.get("/cart", function (req, res, next) {
  let cart = req.cookies.cart;
  if (!cart) cart = [];
  res.render("cart", { cart });
});

module.exports = router;
