const bcrypt = require("bcryptjs");

const Users = require("../../users/users-model");

const validateUser = (req, res, next) => {
	const user = req.body;

	JSON.stringify(user) === "{}" || Object.keys(user).length === 0
		? res.status(400).json({ message: "Username and password are required" })
		: !user.username || !user.password
		? res.status(400).json({
				message: ` ${
					!user.username ? "username" : !user.password ? "password" : null
				} is required`
		  })
		: next();
};

const validatePassword = (req, res, next) => {
	let { username, password } = req.body;

	Users.findBy({ username })
		.first()
		.then(user => {
			if (user && bcrypt.compareSync(password, user.password)) {
				req.user = user;
				next();
			} else {
				res
					.status(401)
					.json({ message: "Invalid credentials. Please try again!" });
			}
		})
		.catch(error =>
			res.status(500).json({ error: "Failed to validate user", error })
		);
};

module.exports = { validateUser, validatePassword };
