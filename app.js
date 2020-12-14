const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const pageRoute = require("./routes/pageRoutes");
const userRoute = require("./routes/userRoutes");
const hamburgerRoutes = require("./routes/hamburgerRoutes");
const emailRoutes = require("./routes/emailRoutes");
const cors = require("cors");
require("dotenv").config();

//connect to database
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Db connected")
);
//set up public public folder for static files
app.use(express.static(path.join(__dirname, "public")));

//body parser
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

//routes middleware
app.use("/", hamburgerRoutes);
app.use("/", userRoute);
app.use("/", pageRoute);
app.use("/", emailRoutes);

//view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
