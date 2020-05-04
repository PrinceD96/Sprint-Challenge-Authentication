const router = require("express-promise-router")();

const { hashPassword, validateUser } = require("./register-middleware");
const Users = require("../../users/users-model");

router.post("/", validateUser, hashPassword, (req, res) => {
	//*   👇 coming from validateUser middleware
	const user = req.response;

	Users.add(user)
		.then(newUser => {
			res.status(201).json(newUser);
		})
		.catch(error =>
			res.status(500).json({ error: "Error adding user", error })
		);
});

module.exports = router;
