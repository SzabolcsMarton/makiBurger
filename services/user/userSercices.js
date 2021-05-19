const User = require("../../model/User");
const bcrypt = require("bcrypt");
const validate = require("../../helpers/validators/registrationValidation");
const sendEmailToConfirm = require("../../helpers/emailSender");
const fetch = require("node-fetch");

exports.createUser = async (userModel) => {
  let validationResult = validate.validate(userModel);

  if (!validationResult[0].success && !validationResult[1]) {
    return {
      status: false,
      message: validationResult.message,
    };
  }

  const user = new User(userModel);
  user.password = await bcrypt.hash(userModel.password, 10);
  user.emailValidationCode = await bcrypt.hash(
    toString(Math.random() * 100),
    10
  );

  let isEmailExist = await User.find({ email: userModel.email });
  if (isEmailExist.length > 0) {
    console.log("email is in use");
    return {
      status: false,
      message: "Ezzel az email cimmel már van regisztrálva felhasználó!",
    };
  }
  try {
    let saveResponse = await user.save();
    let response = await fetch("http://localhost:3000/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(saveResponse),
    });
    return { status: true };
  } catch (err) {
    return err;
  }
};

exports.userLogin = async (body) => {
  let users = await User.find();
  let user = users.find((user) => user.email === body.email);
  if (user == null) {
    return { message: "Cannot find user" };
  }
  try {
    if (await bcrypt.compare(body.password, user.password)) {
      if (user.emailValidationCode == "") {
        return { success: true };
      } else {
        return {
          success: false,
          message:
            "please check your email account and verify your email address",
        };
      }
    } else {
      return { success: false };
    }
  } catch {
    res.status(500).send();
  }
};
