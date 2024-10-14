const con = require("../utils/db");

const getAllArticles = (req, res) => {
  let query = "SELECT * FROM article";
  let articles = [];
  con.query(query, (err, result) => {
    if (err) throw err;
    articles = result;
    res.render("index", {
      articles: articles,
    });
  });
};

const getArticlesBySlug = (req, res) => {
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
};

con.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = {
  getAllArticles,
  getArticlesBySlug,
};
