import React, { Component } from 'react';
import moment from "moment";
import axios from "axios";
import qs from 'qs';

import Layout from '../components/Layout'

import "./FAQPage.scss"

class FAQPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			faq: null,
		};
	}
	
	async componentDidMount() {
		try {
			let res = await axios.get(`//localhost:3001/api/faqs/${this.props.match.params.id}`);
			let faq = res.data.payload;
			this.setState({ faq });

			// let formData = new FormData();
			// formData.set("m", "recordHit");
			// formData.set("faqId", faq.faqid);
			// formData.set("instId", "2028");
			// formData.set("type", "1");

			// axios({
			// 	method: 'POST',
			// 	url: 'https://jsracs.libanswers.com/process_public.php',
			// 	data: formData,
			// 	headers: {'Content-Type': 'multipart/form-data' }
			// })
		} catch (err) {
			this.setState({ error: err })
		}
	}

	vote = (v) => {
		const { faq } = this.state;

		let formData = new FormData();
		formData.set("m", "vote");
		formData.set("faq_id", faq.faqid);
		formData.set("v", v);

		axios({
			method: 'post',
			url: 'https://jsracs.libanswers.com/process_public.php',
			data: formData,
			headers: {'Content-Type': 'multipart/form-data' }
		})
	}

	render() {
		const { faq } = this.state;

		return(
			<Layout>
				{ faq && 
					<div className="faq-page">
						<div className="restrict">
							<h1 className="question">{ faq.question }</h1>
							
							<div className="answer" dangerouslySetInnerHTML={{__html: faq.answer}} />
							<div className="clear"></div>
							
							<div className="answer-footer">
								<div className="info-bar">
									<div className="info-item">
										<p>
											<strong>Created: </strong>
											{ moment(faq.created).format("DD/MM/YY") }
										</p>
									</div>
									<div className="info-item">
										<p>
											<strong>Updated: </strong>
											{ moment(faq.updated).format("DD/MM/YY") }
										</p>
									</div>
									<div className="info-item">
										<p>
											<strong>Views: </strong>
											{ faq.totalhits }
										</p> 
									</div>
									<div className="info-item">
										<p>
											<strong>Score: </strong>
											{console.log(faq)}
											{ parseInt(faq.votes.yes) - parseInt(faq.votes.no) }
										</p> 
									</div>
									<div className="info-item" style={{float: "right"}}>
										<div className="votes">
											<div className="up" onClick={() => this.vote("1")}></div>
											<div className="down" onClick={() => this.vote("0")}></div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				}
			</Layout>
		);
	}
}

export default FAQPage;
