import axios from "axios";

export const axiosWithAuth = () => {
	const token = localStorage.getItem("token");
	const baseURL = process.env.REACT_APP_MAIN_URL;
	return axios.create({
		baseURL: baseURL,
		headers: {
			authorization: token
		}
	});
};
