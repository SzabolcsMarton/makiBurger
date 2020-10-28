const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

const pageRoute = require("./routes/pageRoutes");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

app.use("/", pageRoute);

//view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
