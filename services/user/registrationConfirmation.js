const User = require("../../model/User");

exports.registrationConfirmation = async (code) => {
  const userToValidateEmail = await User.findOne({
    emailValidationCode: code,
  });
  let id = userToValidateEmail.id;
  let updatedEmailValidatedUser = await User.updateOne(
    { _id: id },
    { $set: { emailValidationCode: "" } }
  );
  if (updatedEmailValidatedUser.nModified == 1) {
    return { success: true };
  } else {
    return { success: false };
  }
};
