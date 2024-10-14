const express = require("express");
const router = express.Router();
const {
  getAuthorById,
  getAllAuthors,
} = require("../controllers/authorController");

router.get("/", getAllAuthors);

router.get("/:id", getAuthorById);

module.exports = router;
