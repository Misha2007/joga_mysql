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

const mysql = require("mysql2");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "qwerty",
  database: "joga_mysql",
  multipleStatements: true,
});

app.get("/", (req, res) => {
  let query = "SELECT * FROM article";
  let articles = [];
  con.query(query, (err, result) => {
    if (err) throw err;
    articles = result;
    res.render("index", {
      articles: articles,
    });
  });
});

app.get("/article/:slug", (req, res) => {
  let query = `SELECT article.*, author.id AS author_id, author.name AS author_name
                FROM article 
                JOIN author ON article.author_id = author.id 
                WHERE article.slug="${req.params.slug}"`;
  con.query(query, (err, result) => {
    if (err) throw err;
    article = result;
    res.render("article", {
      article: article,
    });
  });
});

app.get("/:id", (req, res) => {
  let query = `SELECT * FROM article WHERE article.author_id ="${req.params.id}";
  SELECT * FROM author WHERE author.id ="${req.params.id}";`;
  let articles = [];
  con.query(query, (err, result) => {
    if (err) throw err;
    articles = result;
    res.render("author", {
      articles: articles[0],
      author: articles[1],
    });
  });
});

con.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

app.listen(3003, () => {
  console.log("App started at port http://localhost:3003");
});
