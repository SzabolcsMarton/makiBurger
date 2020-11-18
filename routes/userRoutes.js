const express = require("express");
const router = express.Router();

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

module.exports = router;
