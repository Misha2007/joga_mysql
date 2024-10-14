const express = require("express");
const path = require("path");
const hbs = require("express-handlebars");
const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.engine(
  "hbs",
  hbs.engine({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "/views/layouts/"),
  })
);

app.use(express.static("public"));

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

const articleRoutes = require("./routes/article");
const authorRoutes = require("./routes/authorRouter");

app.use("/", articleRoutes);
app.use("/article", articleRoutes);
app.use("/author", authorRoutes);

app.listen(3003, () => {
  console.log("App started at port http://localhost:3003");
});
