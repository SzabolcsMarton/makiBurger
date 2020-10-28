const name = document.getElementById("regName");
const email = document.getElementById("regEmail");
const passWord = document.getElementById("regPassword");
const passWord2 = document.getElementById("regPassword2");
const address = document.getElementById("address");
const regButton = document.getElementById("regButton");
const form = document.getElementById("registerForm");
const errorMessage = document.getElementById("errorMessage");
const users = [];

class User {
  constructor(name, email, passWord, address) {
    this.username = name;
    this.email = email;
    this.passWord = passWord;
    this.address = address;
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let messages = [];

  if (
    !name.value ||
    !email.value ||
    !passWord.value ||
    !passWord2.value ||
    !address.value
  ) {
    messages.push("Kerjuk toltson ki minden mezot");
  }

  if (!emailIsValid(email.value)) {
    messages.push("Kerjuk valos email cimet irjon be");
  }

  if (passWord.value.length < 6) {
    messages.push("A jelszo min 6 karakter");
  }
  if (passWord.value !== passWord2.value) {
    messages.push("A ket jelszo nem egyezik");
  }
  if (messages.length > 0) {
    errorMessage.innerText = messages.join(" , ");
    return;
  } else {
    let user = new User(name.value, email.value, passWord.value, address.value);
    if (!isUserExist(user)) {
      saveUser(user);
      errorMessage.innerText = "";
    } else {
      console.log("Email is already exist");
    }
  }

  console.log(users);
});

function emailIsValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function saveUser(userToSave) {
  users.push(userToSave);
}
function isUserExist(userToCheck) {
  let emailToFind = userToCheck.email;
  let foundEmail = users.some((user) => user.email == emailToFind);
  return foundEmail;
}
