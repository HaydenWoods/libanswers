import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Restrict from "./Restrict"

import JSRLogo from '../images/jsrlogo.png';
import "./Header.scss"

const navItems = [
	{
		name: "Home",
		link: "/",
	},
	{
		name: "FAQ's",
		link: "/faqs",
	},
	{
		name: "Topics",
		link: "/topics",
	},
]

export default class Header extends Component {
	render() {
		const { loc } = this.props;
		return (
			<div id="header">
				<Restrict>
					<div id="nav-bar">
						<a href="https://jsracs.wa.edu.au">
							<div className="nav-logo">
								<img alt="" src={ JSRLogo }></img>
							</div>
						</a>
						{ navItems.map((item, i) => {
							return (
								<Link to={item.link}>
									<div className="nav-item">
										<p>{item.name}</p>
									</div>
								</Link>
							)
						})}
					</div>
				</Restrict>
			</div>       
		);
	}
}