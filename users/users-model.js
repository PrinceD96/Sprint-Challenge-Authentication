const db = require("../database/dbConfig");

function find() {
	return db("users").select("id", "username");
}

function findBy(username) {
	return db("users").where(username);
}

function add(user) {
	return db("users")
		.insert(user)
		.then(([id]) => db("users").where({ id }).first());
}

module.exports = {
	find,
	findBy,
	add
};
