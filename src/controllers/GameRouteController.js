const users = require("../models/UserModel"); 

module.exports = class GameRouteController {
	static async GameGetController(req, res) {
		res.render("game", {
			user: req.user, 
		});
	}

    static async QuestionPostController(req, res) {
        console.log(req.body);
    }
 
};
