import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from "./pages/Home";
import FAQS from "./pages/FAQS";
import FAQPage from "./pages/FAQPage";

export default class App extends Component {
	render() {
		return (
			<Router className="router">
				<div className="router-container">
					<Switch>
						<Route exact path="/" component={ Home }/>
						<Route exact path="/faqs" component={ FAQS }/>
						<Route exact path="/faq/:id" component={ FAQPage }/>
					</Switch>
				</div>
			</Router>
		);
	}
}