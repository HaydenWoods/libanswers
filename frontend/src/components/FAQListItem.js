import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from "moment";

import "./FAQListItem.scss"

class FAQListItem extends Component {

	decodeHTML = (html) => {
		var txt = document.createElement('textarea');
		txt.innerHTML = html;
		return txt.value;
	}

	render() {
		return(
			<Link to={
					{
						pathname: `/faq/${this.props.faq.faqid}`,
						state: {
							faq: this.props.faq,
						},
					}}>
				<div className="faq-list-item">
					<div className="container">
						<div className="top">
							<h1>{ this.decodeHTML(this.props.faq.question) }</h1>
						</div>
						<div className="bottom">
							<p className="faq-list-item-info">
								<strong>Views: </strong>  
								{ this.props.faq.totalhits }
							</p>

							<p className="faq-list-item-info">
								<strong>Updated: </strong>
								{ moment(this.props.faq.updated).format("DD/MM/YY") }
							</p>

							<p className="faq-list-item-info">
								{ this.props.faq.votes.yes }
								<i className="arrow up" style={{
									borderColor: "#ccc",
									borderWidth: "0px 2px 2px 0px",
									marginLeft: "5px",
								}}></i>
							</p>

							{ this.props.noTags === false && this.props.faq.topics.map(
		    				topic => <p key={topic.id} className="faq-list-item-topic">{ topic.name }</p>
		    			)}
						</div>
					</div>
				</div>	
			</Link>
		);
	}
}

export default FAQListItem;
