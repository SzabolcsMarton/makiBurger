const express = require("express");
const router = express.Router();
const userSercices = require("../services/user/userSercices");
const hamburgerSercices = require("../services/hamburger/hamburgerService");

router.get("/about", (req, res) => {
  res.render("pages/about");
});

router.get("/orders", (req, res) => {
  res.render("pages/order");
});

router.get("/admin", (req, res) => {
  res.render("pages/admin");
});

router.get("/", (req, res) => {
  res.render("pages/index");
});

// router.get("/*", (req, res) => {
//   res.render("pages/error404");
// });

module.exports = router;
