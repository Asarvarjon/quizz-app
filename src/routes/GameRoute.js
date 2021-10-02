const { GameGetController, QuestionPostController } = require("../controllers/GameRouteController");
const expressFileUpload = require("express-fileupload");
const router = require("express").Router();

router.get("/create", GameGetController); 
router.post("/create", expressFileUpload(), QuestionPostController)

module.exports = {
	path: "/",
	router,
};