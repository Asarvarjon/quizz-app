 
const GameRoute = require("./GameRoute");
const HomeRoute = require("./HomeRoute"); 
const UserRoute = require("./UserRoute");

module.exports = (app) => {
	app.use(HomeRoute.path, HomeRoute.router);
	app.use(UserRoute.path, UserRoute.router); 
	app.use(GameRoute.path, GameRoute.router); 

};
