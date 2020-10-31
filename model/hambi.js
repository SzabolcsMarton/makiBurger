const mongoose = require("mongoose");

const HambiSchema = mongoose.Schema({
  nev: {
    type: String,
    require: true,
  },
  ar: {
    type: Number,
    require: true,
  },
  leiras: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Hambi", HambiSchema);
