exports.validate = function validate(userModel) {
  if (userModel.password.length < 6) {
    return {
      message: "Passwords shoud be at least 6  characters!",
      errorType: "passwordlength",
      control: "password",
      success: false,
    };
  }
};
