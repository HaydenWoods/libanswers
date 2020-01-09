import React, { Component } from 'react';

import "./PageControls.scss"

export default class PageControls extends Component {
	constructor(props) {
		super(props)
		this.state = {
			faqs: this.props.faqs,
			curFaqs: this.props.curFaqs,
		}
	}

	render() {
		let { name, faqs, curFaqs, options } = this.props;
		return (
			<div className="pagecontrols" style={{marginTop: this.props.isBottom ? "25px" : ""}}>
				<div className={`noselect page-button prev`} onClick={this.props.prevPage}><i className="arrow left"></i></div>
				<div className="center">
					{ faqs && 
						[...Array(Math.ceil((curFaqs && curFaqs.length > 0 ? curFaqs.length : faqs.length) / options.itemsPerPage)).keys()].map((i) => {
							return (
								<div key={i} className={`noselect page-button ${options.page === i ? "current" : ""}`} onClick={() => this.props.onSelect(i)}><p>{i+1}</p></div>
							)
						})
					}
					<div className="clear"></div>
				</div>
				<div className={`noselect page-button next`} onClick={this.props.nextPage}><i className="arrow right"></i></div>
			</div>
		);
	}
}
