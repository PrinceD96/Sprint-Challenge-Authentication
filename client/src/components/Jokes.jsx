import React, { useState, useEffect } from "react";
import axios from "axios";

const Jokes = () => {
	const [jokes, setJokes] = useState([]);
	const [token, setToken] = useState("");

	const fetchJokes = () => {
		// console.log("TOKEN", localStorage.getItem("token"));
		axios
			.get("http://localhost:5000/api/jokes", {
				headers: {
					"Authorization": `Bearer ${token}`
				}
			})
			.then(res => {
				setJokes(res.data);
			})
			.catch(error => console.log(error));
	};

	useEffect(() => {
		setToken(localStorage.getItem("token"));
		if (token) {
			fetchJokes();
		}
	}, [token]);

	return (
		<>
			<h1>Your dad jokes 😂</h1>
			{jokes ? (
				<>
					{jokes.map(({ id, joke }) => (
						<div key={id}>
							<p>{joke}</p>
						</div>
					))}
				</>
			) : null}
		</>
	);
};

export default Jokes;
