exports.validate = function validate(userModel) {
  return userModel.password != userModel.password2
    ? {
        message: "Passwords don't match!",
        errorType: "passworddontmatch",
        success: false,
      }
    : {
        success: true,
      };
};
