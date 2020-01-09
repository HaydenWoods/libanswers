import React, { Component } from 'react';

import "./Input.scss"

export default class Input extends Component {
	constructor(props) {
		super(props)
		this.state = {
			curValue: null,
		}
	}

	changed = (e) => {
		const { onChange } = this.props;
		let newValue = e.target.value;
		this.setState({
			curValue: newValue,
		}, () => {
			onChange(this.state.curValue)
		})
	}

	render() {
		const { curValue } = this.state;
		const { defaultValue, placeholder } = this.props;

		return (
			<div className="input">
				<input
					onChange={this.changed}
					defaultValue={defaultValue}
					placeholder={placeholder}
				>	
				</input>
			</div>  
		);
	}
}
