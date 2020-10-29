const express = require("express");
const router = express.Router();
const User = require("../model/User");

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

router.post("/register", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    address: req.body.address,
  });
  try {
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/", (req, res) => {
  res.render("pages/index");
});

module.exports = router;
