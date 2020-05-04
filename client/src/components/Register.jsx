import React, { useState } from "react";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Lock from "@material-ui/icons/Lock";
import axios from "axios";

const Register = props => {
	const [credentials, setCredentials] = useState({
		username: "",
		password: ""
	});
	const [error, setError] = useState({
		username: false,
		password: false
	});
	const [helperText, setHelperText] = useState({
		username: "",
		password: ""
	});

	const [disable, setDisable] = useState(false);

	const handleChange = e => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });

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

	const handleSubmit = async () => {
		try {
			await axios.post("http://localhost:5000/api/auth/register", credentials);
			console.log("Submitted");
			setCredentials({ username: "", password: "" });
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<div className='signUp__form__container'>
			<h3 className='signUp__form__title'>Register Below!</h3>
			<form onSubmit={handleSubmit}>
				<TextField
					name='username'
					label='Username'
					// required
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
					// required
					error={error.password}
					helperText={helperText.password}
					value={credentials.password}
					onChange={handleChange}
					fullWidth
				/>
				<br />
				<br />
				<br />

				<Button
					size='large'
					variant='contained'
					endIcon={<Lock />}
					color='primary'
					disabled={disable}
					fullWidth
					type='submit'
				>
					Sign Up
				</Button>
				<p>
					Already have an account? <Link to='/login'>Login</Link>
				</p>
			</form>
		</div>
	);
};

export default Register;
