import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import qs from 'qs';

import Layout from '../components/Layout'
import Restrict from '../components/Restrict'
import FAQList from '../components/FAQList'

import "./Home.scss"

export default class Home extends Component {
	constructor(props) {
		super(props)
		this.state = {
			faqs: null,
			search: null,
			searchResults: null,
			showResults: null,
			maxSearchResults: 5,
		}
	}

	componentDidMount() {
		let { sort, order, page, limit } = this.state
		let data = { sort, order, page, limit }
		let queryString = qs.stringify(data)

		axios
		.get(`//localhost:3001/api/faqs?${queryString}`)
		.then(res => {
			let faqs = res.data.payload;
			this.setState({ faqs: faqs });
		})
		.catch(error => this.setState({ error }));
	}

	updateSearch = (e) => {
		let newValue = e.target.value;
		this.setState({
			search: newValue,
			showResults: newValue.length > 0 ? true : false,
		}, () => {
			this.handleSearch(this.state.search)
		})
	}
	handleSearch = (search) => {
		const { faqs, maxSearchResults } = this.state;
		if (faqs) {
			let searchResults = faqs.filter((faq) => 
				(faq.question ? faq.question.toLowerCase() : "").includes(search.toLowerCase())
			)
			this.setState({
				searchResults: searchResults,
			})
		}
	}

	render() {
		const { faqs, searchResults, showResults, maxSearchResults, search } = this.state;

		return (
			<Layout>
				<div className="home">
					<div className="searchtop">
						<Restrict>
							<h1 className="noselect">IT Problems?</h1>
							<h2 className="noselect">Search over {faqs && faqs.length > 1 ? faqs.length-1 : ""} FAQ's for a solution.</h2>

							<div className="searchcontainer">
								<input placeholder="Search..." onChange={this.updateSearch}></input>

								<div className={`searchresults ${showResults ? "open" : "closed"}`}>
									{ searchResults && searchResults.length <= 0 &&
										<a>
											<div className="searchresult">
												<h3>No results found.</h3>
											</div>
										</a>
									}
									{ searchResults && searchResults.map((faq, i) => {
										if (i < maxSearchResults) {
											return(
												<Link to={
													{
														pathname: `/faq/${faq.faqid}`,
														state: {
															faq: this.props.faq,
														},
													}}>
													<div className="searchresult">
														<h3>{faq.question}</h3>
													</div>
												</Link>
											)
										}
									})}
									{ searchResults && searchResults.length > 0 && 
										<Link to={
											{
												pathname: "/faqs",
												defaultSearch: search,
											}}>
											<div className="searchresult">
												<h3>More results...</h3>
											</div>
										</Link>
									}
								</div>
							</div>
						</Restrict>
					</div>

					<Restrict>
						<div className="columns">
							<div className="left">
								{ faqs &&
									<FAQList
										faqs={faqs}
										options= {{
											sort: "totalhits",
											order: "desc",
											itemsPerPage: 10,
											page: 0,
											search: "",
										}}
										title="Most Popular"
										controls={false}
										width="100%"
										noTags={true}
									/>
								}
							</div>
							<div className="right">
								{ faqs &&
									<FAQList
										faqs={faqs}
										options= {{
											sort: "updated",
											order: "desc",
											itemsPerPage: 10,
											page: 0,
											search: "",
										}}
										title="Recently Updated"
										controls={false}
										width="100%"
										noTags={true}
									/>
								}
							</div>
							<div className="clear"></div>
						</div>
					</Restrict>
				</div>
			</Layout>
		);
	}
}
