const validators = [
  require("../vaidators/validators/pwdLengthValidator"),
  require("../vaidators/validators/pwdEqualValidator"),
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
