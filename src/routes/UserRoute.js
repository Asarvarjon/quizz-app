const {
	UserRegistrationGetController,
	UserLoginGetController,
	UserSignUpPostController, 
	UserLoginPostController,
	UserExitGetController, 
} = require("../controllers/UserRouteController");
const AuthMiddleware = require("../middlewares/AuthMiddleware");

const router = require("express").Router();

router.get("/signup", UserRegistrationGetController);
router.get("/login", UserLoginGetController);  
router.get("/exit", UserExitGetController)

router.post("/signup", UserSignUpPostController);
router.post("/login", UserLoginPostController);

module.exports = {
	path: "/",
	router,
};
