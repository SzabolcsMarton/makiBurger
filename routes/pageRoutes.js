const express = require("express");
const router = express.Router();
const userSercices = require("../services/user/userSercices");
const hamburgerSercices = require("../services/hamburger/hamburgerService");

router.get("/about", (req, res) => {
  res.render("pages/about");
});

router.get("/products", async (req, res) => {
  let hamburgers = await hamburgerSercices.getAllBurgers();
  res.render("pages/products", {
    hamburgers: hamburgers,
  });
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
  if (createUserResult.status == true) {
    res.json({
      failure: false,
    });
  } else {
    res.json({
      message: createUserResult.message,
      failure: true,
      errorType: "Internal Error",
    });
  }
});

router.get("/admin", (req, res) => {
  res.render("pages/admin");
});

router.post("/admin/hamburger", async (req, res) => {
  let hamburgerModel = {
    name: req.body.newHamburgerName,
    price: req.body.newHamburgerPrice,
    toppings: req.body.newHamburgerToppings,
  };
  var createHamburgerResult = await hamburgerSercices.createNewHamburger(
    hamburgerModel
  );
  if (createHamburgerResult == true) {
    res.redirect("/admin");
  } else {
    res.json({
      message: createHamburgerResult,
      failure: true,
      errorType: "Internal Error",
    });
  }
});

router.get("/admin/hamburger/:name", async (req, res) => {
  let hamburgerName = req.params.name;
  let foundBurger = await hamburgerSercices.getOneBurgerByName(hamburgerName);
  console.log(foundBurger);
  res.json(foundBurger);
});

router.delete("/admin/hamburger/:name", async (req, res) => {
  let hamburgerName = req.params.name;
  let deletedBurger = await hamburgerSercices.deleteOneBurgerByName(
    hamburgerName
  );
  console.log(deletedBurger);
  res.json({ message: "Burger deleted!" });
});

router.patch("/admin/hamburger/:name", async (req, res) => {
  let name = req.params.name;
  let hamburgerModel = {
    name: req.body.newHamburgerName,
    price: req.body.newHamburgerPrice,
    toppings: req.body.newHamburgerToppings,
  };
  let upDateBurger = await hamburgerSercices.upDateOneBurberByName(
    name,
    hamburgerModel
  );
  console.log(upDateBurger);
  res.json({ message: "Burger updated!" });
});

router.get("/", (req, res) => {
  res.render("pages/index");
});

module.exports = router;
