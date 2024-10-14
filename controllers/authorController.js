const con = require("../utils/db");

const getAuthorById = (req, res) => {
  const authorId = req.params.id;
  const query = `
    SELECT * FROM article WHERE article.author_id ="${authorId}";
    SELECT * FROM author WHERE author.id ="${authorId}";
  `;
  con.query(query, (err, result) => {
    if (err) throw err;
    const articles = result[0]; // First query result is articles
    const author = result[1][0]; // Second query result is author
    res.render("author", {
      articles: articles,
      author: author,
    });
  });
};

const getAllAuthors = (req, res) => {
  const query = "SELECT * FROM author";
  con.query(query, (err, result) => {
    if (err) throw err;
    res.render("authors", {
      authors: result,
    });
  });
};

module.exports = {
  getAuthorById,
  getAllAuthors,
};
