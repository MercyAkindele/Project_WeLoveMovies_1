const router = require("express").Router({mergeParams:true});
const controller = require("./movies.controller");
const reviewsRouter = require("../reviews/reviews.router");
const theatersRouter = require("../theaters/theaters.router");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.use("/:movieId([0-9]+)/reviews", reviewsRouter)
router.use("/:movieId([0-9]+)/theaters", theatersRouter)

router.route("/").get(controller.list).all(methodNotAllowed);
router.route("/:movieId([0-9]+)").get(controller.read).all(methodNotAllowed)


module.exports = router;
