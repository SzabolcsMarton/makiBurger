const Hamburger = require("../../model/Hambi");

exports.createNewHamburger = async (hamburgerModel) => {
  let hamburger = new Hamburger(hamburgerModel);
  try {
    let newBurger = await hamburger.save();
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
    let foundBurger = await getBurger(name);
    if (foundBurger != null) {
      console.log(foundBurger);
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
    let foundBurger = await getBurger(name);
    if (foundBurger != null) {
      let deletedBurger = await Hamburger.deleteOne(foundBurger);
      return deletedBurger;
    } else {
      return {
        message: "Hamburger not found in Database!",
      };
    }
  } catch (err) {
    return err;
  }
};

exports.upDateOneBurberByName = async (name, hamburgerModel) => {
  try {
    let burger = await getBurger(name);
    if (burger != null) {
      if (hamburgerModel.name != null) {
        burger.name = hamburgerModel.name;
      }
      if (hamburgerModel.price != null) {
        burger.price = hamburgerModel.price;
      }
      if (hamburgerModel.toppings != null) {
        burger.toppings = hamburgerModel.toppings;
      }
      //console.log(burger);
      let upDatedBurger = await Hamburger.updateOne(
        { name: name },
        {
          $set: {
            name: burger.name,
            price: burger.price,
            toppings: burger.toppings,
          },
        }
      );
      return upDatedBurger;
    } else {
      return {
        message: "Hamburger not found in Database!",
      };
    }
  } catch (err) {
    return err;
  }
};

async function getBurger(name) {
  let burger = await Hamburger.findOne({ name });
  return burger;
}
