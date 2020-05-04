const request = require("supertest");

const server = require("./server");
const db = require("../database/dbConfig");

describe("server", () => {
	it("should set the testing environment", () => {
		expect(process.env.DB_ENV).toBe("testing");
	});

	beforeAll(async () => await db("users").truncate());

	// !Register endpoint tests

	describe("POST /register", () => {
		const newUser = { username: "Dan", password: "XYZ" };

		it("should return 201", async () => {
			await request(server)
				.post("/api/auth/register")
				.send(newUser)
				.then(res => expect(res.status).toBe(201))
				.catch(error => console.log(error));
		});

		it("should return a user with id and username", async () => {
			await request(server)
				.post("/api/auth/register")
				.send(newUser)
				.then(async res => {
					const addedUser = await db("users")
						.where({ username: newUser.username })
						.first();
					expect(addedUser).toHaveProperty("id");
					expect(addedUser).toHaveProperty("username");
				})
				.catch(error => console.log(error));
		});
	});

	// !Login endpoint tests

	describe("POST /login", () => {
		const user = { username: "Dan", password: "XYZ" };

		it("should return 200", async () => {
			await request(server)
				.post("/api/auth/login")
				.send(user)
				.then(res => expect(res.status).toBe(200))
				.catch(error => console.log(error));
		});

		it("should return a user with o token property", async () => {
			await request(server)
				.post("/api/auth/login")
				.send(user)
				.then(res => expect(res.body).toHaveProperty("token"))
				.catch(error => console.log(error));
		});
	});

	// !Jokes endpoint tests

	describe("GET /jokes", () => {
		it("should return 500 without token", async () => {
			await request(server)
				.get("/api/jokes")
				.then(res => expect(res.status).toBe(500))
				.catch(error => console.log(error));
		});

		it("should return correct content-type", async () => {
			const newUser = { username: "Dan", password: "XYZ" };
			const user = { username: "Dan", password: "XYZ" };

			await request(server)
				.post("/api/auth/register")
				.send(newUser)
				.then(async () => {
					await request(server)
						.post("/api/auth/login")
						.send(user)
						.expect(200)
						.then(async res => {
							const token = res.body.token;

							await request(server)
								.get("/api/jokes")
								.set("authorization", token)
								.expect("Content-Type", /json/);
						});
				});
		});
	});
});
