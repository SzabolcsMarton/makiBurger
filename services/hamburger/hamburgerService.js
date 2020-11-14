const Hamburger = require("../../model/Hambi");

exports.createNewHamburger = async (hamburgerModel) => {
  let hamburger = new Hamburger(hamburgerModel);
  try {
    await hamburger.save();
    return true;
  } catch (err) {
    return err;
  }
};

exports.getAllBurgers = async () => {
  try {
    const burgerArray = await Hamburger.find();
    return burgerArray;
  } catch (err) {
    return err;
  }
};

exports.getOneBurgerByName = async (name) => {
  try {
    let foundBurger = await Hamburger.find({ name: name });
    if (foundBurger != null) {
      return foundBurger;
    } else {
      return {
        message: "Hamburger not found in Database!",
      };
    }
  } catch (err) {
    return err;
  }
};

exports.deleteOneBurgerByName = async (name) => {
  try {
    await Hamburger.deleteOne({ name: name });
  } catch (err) {
    return err;
  }
};

exports.upDateOneBurberByName = async (
  name,
  newName,
  newPrice,
  newToppings
) => {
  try {
    const result = await Hamburger.updateOne(
      { name: name },
      { name: newName, price: newPrice, toppings: newToppings }
    );
    return res.nModified;
  } catch (err) {
    return err;
  }
};
