const Joi = require("joi");

module.exports = class Validations {
	static async SignUpValidation(data) {
		return await Joi.object({
			name: Joi.string()
				.required()
				.min(3)
				.max(32)
				.trim()
				.error(new Error("Name is invalid")), 
			password: Joi.string()
				.required()
				.error(new Error("Password is invalid")),
		}).validateAsync(data);
	}
	static async LoginValidation(data) {
		return await Joi.object({
			name: Joi.string()
				.required()
				.min(3)
				.max(32)
				.trim()
				.error(new Error("Name is invalid")), 
			password: Joi.string()
				.required()
				.error(new Error("Password is invalid")),
		}).validateAsync(data);
	} 
};
