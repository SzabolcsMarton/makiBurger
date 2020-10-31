const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../model/User");
const userSercices = require("../services/user/userSercices");

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
  var userModel = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    password2: req.body.password2,
    address: req.body.address,
  };
  var createUserResult = await userSercices.createUser(userModel);
  if (createUserResult == true) {
    res.json({
      message: "success",
    });
  } else {
    res.json({
      message: createUserResult,
      failure: true,
      errorType: "Internal Error",
    });
  }
});

router.post("/register", userSercices.createUser);

router.get("/admin", (req, res) => {
  res.render("pages/admin");
});

router.get("/", (req, res) => {
  res.render("pages/index");
});

module.exports = router;
