const express = require("express");
const router = express.Router();

router.get("/about", (req, res) => {
  res.render("pages/about");
});

router.get("/products", (req, res) => {
  res.render("pages/products");
});

router.get("/orders", (req, res) => {
  res.render("pages/order");
});

router.get("/login", (req, res) => {
  res.render("pages/login");
});

router.get("/register", (req, res) => {
  res.render("pages/register");
});

router.get("/", (req, res) => {
  res.render("pages/index");
});

module.exports = router;
