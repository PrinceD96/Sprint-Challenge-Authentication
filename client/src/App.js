import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Register from "./components/Register";
// import Login from "./components/Login";
// import Users from "./components/Users";

import "./App.css";

function App() {
	return (
		<Router>
			<div className='App'>
				<Switch>
					{/* <Route exact path='/login' component={Login} /> */}
					<Route path='/' component={Register} />
					{/* <ProtectedRoute path='/users' component={Users} /> */}
				</Switch>
			</div>
		</Router>
	);
}

export default App;
