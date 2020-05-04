const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../env");

module.exports = user => {
	const payload = {
		...user
	};

	const options = {
		expiresIn: "30 min"
	};

	return jwt.sign(payload, JWT_SECRET, options);
};
