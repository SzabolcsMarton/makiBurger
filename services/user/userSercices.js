const User = require("../../model/User");
const bcrypt = require("bcrypt");
const validate = require("../../helpers/validators/registrationValidation");

exports.createUser = async (userModel) => {
  var validationResult = validate.validate(userModel);
  if (!validationResult.success) {
    return validationResult.message;
  }

  const user = new User(userModel);
  user.password = await bcrypt.hash(userModel.password, 10);
  user.emailValidationCode = await bcrypt.hash(
    toString(Math.random() * 100),
    10
  ); //this should be always unique.

  try {
    var message = await user.save();

    //send email to the user email address, and the email should have this url in it:
    //   https://{localhost:3000}/registrationConfirmation?code={user.emailValidationCode}
    //
    //The new API (registrationConfirmation) should check the code if exist in the database
    // - fetch the User from the database with the same code so you will have the User objectum
    // - clear the registrationConfirmation for the User and save it back to the Database
    // - and redirect the user to login page

    // the login page should check the emailValidationCode for the current user, and if it has any value,
    //    the system should not let the user in. It may notify the user the she should check her email and click on the validation link in it
    // if it does not have value, the user allowed to log in.

    return true;
  } catch (err) {
    return err;
  }
};
