const express = require("express");
const router = express.Router();
const userServices = require("../services/user/userSercices");
const registrationConfirmation = require("./../services/user/registrationConfirmation");

router.get("/login", (req, res) => {
  res.render("pages/login");
});
router.post("/login", async (req, res) => {
  let isLogedIn = await userServices.userLogin(req.body);
  console.log(isLogedIn);
  res.send(isLogedIn);
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
  var createUserResult = await userServices.createUser(userModel);
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

router.get("/register/registrationConfirmation", async (req, res) => {
  let resp = await registrationConfirmation.registrationConfirmation(
    req.query.code
  );
  console.log(resp.success);
  if (resp.success == true) {
    res.redirect("http://localhost:3000/login");
  } else {
    res.send({ message: "something went wrong" });
  }
});

module.exports = router;
