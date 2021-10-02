const mongoose = require("mongoose");

const questionShcema = new mongoose.Schema({
	quiz_name: {
		type: String,
		max: [32, "Ismingiz juda uzun"],
		min: [3, "Ismingiz juda qisqa"],
		required: true,
	}, 
	question_text: {
		type: String,
		required: true,
	}, 
    file: [String],
    

});

const questions = mongoose.model("questions", questionShcema);

module.exports = questions;
