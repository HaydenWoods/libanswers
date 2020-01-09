import React, { Component } from 'react';

import "./Checkbox.scss"

export default class Checkbox extends Component {
	render() {
		const { toggled } = this.props;

		return (
			<div className="checkbox" onClick={this.props.onClick}>
				<div className={`check ${toggled && toggled ? "on" : "off"}`}>

				</div>
			</div>  
		);
	}
}
