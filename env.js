const dotenv = require("dotenv");

dotenv.config();

module.exports = {
	DB_URL: process.env.DB_URL,
	PORT: process.env.PORT,
	DB_ENV: process.env.DB_ENV,
	JWT_SECRET: process.env.JWT_SECRET || "My final secret"
};
