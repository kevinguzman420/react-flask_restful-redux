import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Users from './containers/Users';

import { Provider } from 'react-redux';
import generateStore from './redux/store';

function App() {
	const store = generateStore();
  return (
		<Provider store={store}>
			<Router>
				<Switch>
					{/* <Route exact path="/api/" /> */}
					<Route exact path="/" component={Users} />
				</Switch>
			</Router>
		</Provider>
	);
}

export default App;
