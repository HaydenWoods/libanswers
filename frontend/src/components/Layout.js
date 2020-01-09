import React, { Component } from 'react';

import Header from "./Header"; 
import Footer from "./Footer"; 

import "./Layout.scss"

export default class Layout extends Component {
	render() {
		const loc = window.location.pathname;

		return (
			<div className="container">
				<Header
					loc={loc}
				/>
				<div className="content">
					{this.props.children}
				</div>
				<Footer
					loc={loc}
				/>
			</div>
		);
	}	
}