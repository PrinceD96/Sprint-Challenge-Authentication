const router = require("express-promise-router")();

const registerRouter = require("./register/register-router");
const loginRouter = require("./login/login-router");

module.exports = [
	router.use("/register", registerRouter),
	router.use("/login", loginRouter)
];
