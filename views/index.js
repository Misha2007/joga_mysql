const express = require("express");
const path = require("path");
const hbs = require("express-handlebars");
const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("views.engine", "hbs");
app.engine(
  "hbs",
  hbs.engine({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views/layouts"),
  })
);

app.use(express.static("public"));

const mysql = require("mysql");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "qwerty",
  database: "joga_mysql",
});

con.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

app.listen(3003, () => {
  console.log("App started at port http://localhost:3003");
});
