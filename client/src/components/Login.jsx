import React, { useState } from "react";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Lock from "@material-ui/icons/Lock";
import axios from "axios";
import FadeLoader from "react-spinners/FadeLoader";
import { css } from "@emotion/core";

const Login = props => {
	const [credentials, setCredentials] = useState({
		username: "",
		password: ""
	});
	const [error, setError] = useState({
		credentials: "",
		username: false,
		password: false
	});
	const [helperText, setHelperText] = useState({
		username: "",
		password: ""
	});
	const [disable, setDisable] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const override = css`
		display: block;
		margin: 0 auto;
		border-color: red;
	`;

	const handleChange = e => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
		setError({
			credentials: "",
			username: false,
			password: false
		});

		const char = e.target.value.length;

		if (e.target.name === "username") {
			if (char < 3) {
				setError({ ...error, username: true });
				setDisable(true);
				setHelperText({
					...helperText,
					username: "Username must be 3 characters or more!"
				});
			} else {
				setHelperText({
					...helperText,
					username: ""
				});
				setError({ ...error, username: false });
				setDisable(false);
			}
		} else if (e.target.name === "password") {
			if (char < 6) {
				setError({ ...error, password: true });
				setDisable(true);
				setHelperText({
					...helperText,
					password: "Password must be 6 characters or more!"
				});
			} else {
				setHelperText({
					...helperText,
					password: ""
				});
				setError({ ...error, password: false });
				setDisable(false);
			}
		}
	};

	const handleSubmit = async e => {
		try {
			e.preventDefault();
			setIsLoading(true);
			let res = await axios.post(
				"http://localhost:5000/api/auth/login",
				credentials
			);
			setCredentials({ username: "", password: "" });
			localStorage.setItem("token", res.data.token);
			props.history.push("/jokes");
		} catch (e) {
			setError({
				credentials: e.response.data.message,
				username: true,
				password: true
			});
			setCredentials({ username: "", password: "" });
		}
	};

	return (
		<div className='signUp__form__container'>
			<h3 className='signUp__form__title'>Welcome back!</h3>
			{error.credentials && <p style={{ color: "red" }}>{error.credentials}</p>}
			<form onSubmit={handleSubmit}>
				<TextField
					name='username'
					label='Username'
					error={error.username}
					autoFocus
					helperText={helperText.username}
					value={credentials.username}
					onChange={handleChange}
					fullWidth
				/>
				<br />
				<br />
				<TextField
					name='password'
					label='Password'
					type='password'
					error={error.password}
					helperText={helperText.password}
					value={credentials.password}
					onChange={handleChange}
					fullWidth
				/>
				<br />
				<br />
				<br />
				{isLoading ? (
					<FadeLoader
						css={override}
						size={150}
						color={"#123abc"}
						loading={isLoading}
					/>
				) : (
					<>
						<Button
							size='large'
							variant='contained'
							endIcon={<Lock />}
							color='primary'
							disabled={disable}
							fullWidth
							type='submit'
						>
							Login
						</Button>
						<p>
							Don't have an account yet? <Link to='/register'>Register</Link>
						</p>
					</>
				)}
			</form>
		</div>
	);
};

export default Login;
