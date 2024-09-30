const express = require("express");
const path = require("path");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
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
