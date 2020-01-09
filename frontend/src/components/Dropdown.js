import React, { Component } from 'react';

import "./Dropdown.scss"

export default class Dropdown extends Component {
	constructor(props) {
		super(props)
		this.state = {
			open: false,
			selected: this.props.selected,
		}
	}

	toggleMenu = () => {
		this.setState({
			open: !this.state.open 
		})
	}
	selectItem = (e) => {
		const {options} = this.props;
		let i = parseInt(e.target.dataset.index);
		this.props.onSelect(options[i].value)

		this.setState({
			selected: i,
		}, () => {
			this.toggleMenu()
		})
	}

	render() {
		const { open, selected } = this.state;
		const { name, options } = this.props;

		return (
			<div className="dropdown">
				<p onClick={this.toggleMenu} className={`noselect ${open ? "open" : "closed"}`}>
					{ selected !== null ? options[selected].display : "Sort by..." } 
					<i className={`arrow down`} style={{
						marginBottom: "3px",
						marginLeft: "10px",
					}}></i>
				</p>
				<ul className={`${open ? "open" : "closed"}`}>
					{ options.map((item, i) => {
						return(
							<li className={`noselect ${i === selected ? "selected" : ""}`} key={i} data-index={i} onClick={this.selectItem}>{item.display}</li>
						)
					})}
				</ul>
			</div>  
		);
	}
}
