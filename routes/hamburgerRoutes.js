const express = require("express");
const router = express.Router();
const hamburgerSercices = require("../services/hamburger/hamburgerService");

router.get("/products", async (req, res) => {
  let hamburgers = await hamburgerSercices.getAllBurgers();
  res.render("pages/products", {
    hamburgers: hamburgers,
  });
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

router.get("/admin/hamburger/:name", async (req, res) => {
  let hamburgerName = req.params.name;
  let foundBurger = await hamburgerSercices.getOneBurgerByName(hamburgerName);
  console.log(foundBurger);
  res.json(foundBurger);
});

router.get("/admin/hamburgers/:id", async (req, res) => {
  let foundBurger = await hamburgerSercices.getOneBurgerById(req.params.id);
  //console.log(foundBurger);
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
  console.log(req);
  let name = req.params.name;
  let hamburgerModel = {
    name: req.body.name,
    price: req.body.price,
    toppings: req.body.toppings,
  };
  let upDateBurger = await hamburgerSercices.upDateOneBurberByName(
    name,
    hamburgerModel
  );
  if (upDateBurger.nModified == 1) {
    res.json({ message: "Burger updated!" });
  } else {
    res.json({ message: "Something went wrong" });
  }
  console.log(upDateBurger);
});

module.exports = router;
