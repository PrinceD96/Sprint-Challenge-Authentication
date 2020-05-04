const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../env");

module.exports = (req, res, next) => {
	const token = req.headers.authorization.split(" ")[1];

	if (token) {
		jwt.verify(token, JWT_SECRET, (error, decodedToken) => {
			if (error) {
				res.status(401).json({ error: "You're not authorized!" });
			} else {
				req.decodedToken = decodedToken;
				next();
			}
		});
	} else {
		res.status(401).json({ error: "You're not authorized!" });
	}
};
