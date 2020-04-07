const router = require("express").Router();
const booksRoutes = require("./books");

// Employee routes
router.use("/books", booksRoutes);

module.exports = router;
