import React, { useState, useEffect } from "react";
import axios from "axios";
import Skeleton from "@material-ui/lab/Skeleton";

const Jokes = () => {
	const [jokes, setJokes] = useState([]);
	const [token, setToken] = useState("");

	const fetchJokes = () => {
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
			setTimeout(() => {
				fetchJokes();
			}, 2000);
		}
	}, [token]);

	return (
		<>
			<h1>Your dad jokes 😂</h1>
			{jokes.length ? (
				<>
					{jokes.map(({ id, joke }) => (
						<div key={id} className='jokes__container'>
							<p>{joke}</p>
						</div>
					))}
				</>
			) : (
				<>
					<Skeleton
						animation='wave'
						width={600}
						height={50}
						style={{ margin: "auto" }}
					/>
					<Skeleton
						animation='wave'
						width={400}
						height={50}
						style={{ margin: "auto" }}
					/>
					<Skeleton
						animation='wave'
						width={350}
						height={50}
						style={{ margin: "auto" }}
					/>
					<Skeleton
						animation='wave'
						width={550}
						height={50}
						style={{ margin: "auto" }}
					/>
					<Skeleton
						animation='wave'
						width={450}
						height={50}
						style={{ margin: "auto" }}
					/>
					<Skeleton
						animation='wave'
						width={250}
						height={50}
						style={{ margin: "auto" }}
					/>
					<Skeleton
						animation='wave'
						width={360}
						height={50}
						style={{ margin: "auto" }}
					/>
					<Skeleton
						animation='wave'
						width={320}
						height={50}
						style={{ margin: "auto" }}
					/>
					<Skeleton
						animation='wave'
						width={280}
						height={50}
						style={{ margin: "auto" }}
					/>
					<Skeleton
						animation='wave'
						width={290}
						height={50}
						style={{ margin: "auto" }}
					/>
					<Skeleton
						animation='wave'
						width={180}
						height={50}
						style={{ margin: "auto" }}
					/>
					<Skeleton
						animation='wave'
						width={220}
						height={50}
						style={{ margin: "auto" }}
					/>
					<Skeleton
						animation='wave'
						width={560}
						height={50}
						style={{ margin: "auto" }}
					/>
				</>
			)}
		</>
	);
};

export default Jokes;
