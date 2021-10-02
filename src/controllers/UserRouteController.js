const users = require("../models/UserModel"); 
const { SignUpValidation, LoginValidation } = require("../modules/validations");
const { generateHash, compareHash } = require("../modules/bcrypt");
const { email: sendEmail } = require("../modules/email");
const { createToken } = require("../modules/jwt");
const { isValidObjectId } = require("mongoose");
const sessions = require("../models/SessionsModel");

module.exports = class UserRouteController {
	static async UserRegistrationGetController(req, res) {
		res.render("registration");
	}
	static async UserLoginGetController(req, res) {
		res.render("login");
	}
	static async UserSignUpPostController(req, res) {
		try {
			const { name, email, password } = await SignUpValidation(req.body);

			const user = await users.create({
				name,
				email,
				password: await generateHash(password),
			}); 

			res.redirect("/login");
		} catch (error) {
			console.log(error);
			res.render("registration", {
				error: error + "",
			});
		}
	} 
	static async UserLoginPostController(req, res) {
		try {
			const { email, password } = await LoginValidation(req.body);

			const user = await users.findOne({
				email: email,
			});

			if (!user) throw new Error("User topilmadi");

			if (!(await compareHash(password, user.password)))
				throw new Error("Parol xato");

			await sessions.deleteMany({
				owner_id: user._id,
				user_agent: req.headers["user-agent"],
			});

			const session = await sessions.create({
				owner_id: user._id,
				user_agent: req.headers["user-agent"],
			});

			res.cookie(
				"token",
				await createToken({
					session_id: session._id,
				})
			).redirect("/profile");
		} catch (error) {
			res.render("login", {
				error: error + "",
			});
		}
	}

	static async UserExitGetController(req, res) {
		res.clearCookie("token").redirect("/");
	}
	static async UserProfileGetController(req, res) {
		const valid = isValidObjectId(req.params?.id);

		if (!valid) {
			res.redirect("/");
			return 0;
		}

		const user = await users.findById(req.params?.id);

		if (!user) {
			res.redirect("/");
			return 0;
		} 

		res.render("profile", {
			user: req.user,
			profile: user,
			isOwnProfile: req.user._id.equals(user._id), 
		});
	}

	static async UserSessionsGetController(req, res) {
		try {
			const user_sessions = await sessions.find({
				owner_id: req.user._id,
			});

			res.render("sessions", {
				user: req.user,
				user_sessions,
			});
		} catch (error) {
			console.log(error);
			res.redirect("/");
		}
	}

	static async UserSessionDeleteController(req, res) {
		try {
			const session_id = isValidObjectId(req.params?.id);

			if (!session_id) throw new Error("Session id is invalid");

			let x = await sessions.deleteOne({
				owner_id: req.user._id,
				_id: req.params?.id,
			});

			res.redirect("/users/sessions");
		} catch (error) {
			console.log(error);
			res.redirect("/users/sessions");
		}
	}
};
