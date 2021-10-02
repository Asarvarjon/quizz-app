const { HomeGetController, ProfileRouteGetController } = require("../controllers/HomeRouteController");

const router = require("express").Router();

router.get("/", HomeGetController);
router.get("/profile", ProfileRouteGetController)

module.exports = {
	path: "/",
	router,
};
