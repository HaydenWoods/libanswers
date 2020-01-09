import React, { Component } from 'react';

import "./Loader.scss";

export default class Loader extends Component {
	render() {
		return (
			<div className="loadercontainer">
				<div className="loader"></div>
			</div>
		);
	}	
}
