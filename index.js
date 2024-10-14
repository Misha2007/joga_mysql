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

app.use("/", articleRoutes);
app.use("/article", articleRoutes);

app.get("/author/:id", (req, res) => {
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

app.listen(3003, () => {
  console.log("App started at port http://localhost:3003");
});
