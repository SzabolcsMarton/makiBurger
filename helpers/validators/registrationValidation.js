const validators = [
  require("../validators/validators/pwdLengthValidator"),
  require("../validators/validators/pwdEqualValidator"),
];

exports.validate = function validate(userModel) {
  let validatorResults = [];
  for (var i = 0; i < validators.length; i++) {
    let validator = validators[i];
    let validatorResult = validator.validate(userModel);
    validatorResults.push(validatorResult);
  }

  return validatorResults;
};
