const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://SzabolcsMarton:Szaba1980@hamburger.pnsbz.mongodb.net/Hamburger?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Db connected")
);

const pageRoute = require("./routes/pageRoutes");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", pageRoute);

//view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
