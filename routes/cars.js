const { response } = require("express");
var express = require("express");
var router = express.Router();
var Car = require("../models/CarModels");
var checkSessionAuth = require("../middlewares/checkSessionAuth");

/* GET cars list */
router.get("/", async function (req, res, next) {
  let cars = await Car.find();
  console.log(req.session.user);
  res.render("cars/list", { title: "Cars List from DB", cars });
});

/* add new record page*/
router.get("/add", checkSessionAuth, function (req, res, next) {
  res.render("cars/add");
});

/* add new record to cars list in database*/
router.post("/add", async function (req, res, next) {
  let car = new Car(req.body);
  await car.save();
  res.redirect("/cars");
});

/* delete record from cars list in database*/
router.get("/delete/:id", async function (req, res, next) {
  let car = await Car.findByIdAndDelete(req.params.id);
  res.redirect("/cars");
});

/* edit/update record from cars list in database*/
router.get("/edit/:id", async function (req, res, next) {
  let car = await Car.findById(req.params.id);
  res.render("cars/edit", { car });
});

router.post("/edit/:id", async function (req, res, next) {
  let car = await Car.findById(req.params.id);
  car.name = req.body.name;
  car.price = req.body.price;
  car.model = req.body.model;
  await car.save();
  res.redirect("/cars");
});

/* add product to cart*/
router.get("/cart/:id", async function (req, res, next) {
  let car = await Car.findById(req.params.id);
  let cart = [];
  if (req.cookies.cart) cart = req.cookies.cart;
  cart.push(car);
  res.cookie("cart", cart);
  console.log(cart);
  res.redirect("/cars");
});

/* delete product from cart*/
router.get("/cart/remove/:id", async function (req, res, next) {
  let cart = [];
  if (req.cookies.cart) cart = req.cookies.cart;
  cart.splice(cart.findIndex((c) => c._id == req.params.id));
  res.cookie("cart", cart);
  res.redirect("/cart");
});

module.exports = router;
