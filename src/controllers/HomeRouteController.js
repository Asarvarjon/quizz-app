const users = require("../models/UserModel"); 

module.exports = class HomeRouteController {
	static async HomeGetController(req, res) {
		res.render("index", {
			user: req.user, 
		});
	}

	static async ProfileRouteGetController(req, res) { 
		res.render("home",{
			user: req.user, 
		})
	}
};
