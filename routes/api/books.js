const router = require("express").Router();
const controller = require("../../controllers/controller");

// Matches with "/api/books"
router
  .route("/")
  .get(controller.findAll)
  .post(controller.create);

router.route("/:id")
  .delete(controller.remove);

module.exports = router;
