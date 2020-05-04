const bcrypt = require("bcryptjs");

const hashPassword = (req, res, next) => {
	let user = req.body;

	const hash = bcrypt.hashSync(user.password, 14);
	user.password = hash;
	next();
};

const validateUser = (req, res, next) => {
	const user = req.body;

	JSON.stringify(user) === "{}" || Object.keys(user).length === 0
		? res.status(400).json({ message: "Must provide username and password" })
		: !user.username || !user.password
		? res.status(400).json({
				message: `Must provide ${
					!user.username ? "username" : !user.password ? "password" : null
				}`
		  })
		: (req.response = user);
	next();
};

module.exports = { hashPassword, validateUser };
