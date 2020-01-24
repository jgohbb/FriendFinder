var path = require("path");

module.exports = function(app) {
	// get route showing the survey page when survey button is pressed
	app.get("/survey", function(req, res) {
		res.sendFile(path.join(__dirname, "/../public/survey.html"));
	});

	// default catch-all that leads to home.html
	app.use(function(req, res) {
		res.sendFile(path.join(__dirname, "/../public/home.html"));
	});
};