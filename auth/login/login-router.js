const router = require("express-promise-router")();

const { validateUser, validatePassword } = require("./login-middleware");
const generateToken = require("../generateToken");

router.post("/", validateUser, validatePassword, (req, res) => {
	//*   👇 coming from validatePassword middleware
	const { user } = req;

	const token = generateToken(user);

	res.status(200).json({
		message: `Welcome back ${user.username}!`,
		token
	});
});

module.exports = router;
