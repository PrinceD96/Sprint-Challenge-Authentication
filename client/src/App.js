import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Register from "./components/Register";
import Login from "./components/Login";
import ProtectedRoute from "./utils/protectedRoute";
import Jokes from "./components/Jokes";

import "./App.css";

function App() {
	return (
		<Router>
			<div className='App'>
				<Switch>
					<Route exact path='/login' component={Login} />
					<Route path='/register' component={Register} />
					<ProtectedRoute path='/jokes' component={Jokes} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
