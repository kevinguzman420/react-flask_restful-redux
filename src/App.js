import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Users from './containers/Users';

function App() {
  return (
		<Router>
			<Switch>
				<Route exact path="/api/" />
				<Route exact path="/" component={Users} />
			</Switch>
		</Router>
	);
}

export default App;
