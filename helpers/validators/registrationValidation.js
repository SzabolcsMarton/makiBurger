exports.validate = function validate(userModel) {
  if (userModel.password != userModel.password2) {
    return {
      message: "Passwords don't match!",
      errorType: "passworddontmatch",
      success: false,
    };
  }

  if (userModel.password.length < 6) {
    return {
      message: "Passwords shoud be at least 6  characters!",
      errorType: "passwordlength",
      control: "password",
      success: false,
    };
  }

  return {
    success: true,
  };
};
