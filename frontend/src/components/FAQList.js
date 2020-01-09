import React, { Component } from 'react';
import moment from 'moment'
import _ from 'lodash'

import Restrict from "./Restrict"
import FAQControls from "./FAQControls";
import FAQListItem from "./FAQListItem";
import Checkbox from "./Checkbox";
import Loader from "./Loader"
import PageControls from "./PageControls"

import "./FAQList.scss";

export default class FAQList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			faqs: this.props.faqs,
			curFaqs: null,
			options: this.props.options,
			topics: this.props.topics,
		}
	}

	componentDidMount() {
		this.renderCurFaqs()
	}

	handleSort = (faqs, sort, dir) => {
		if (sort === "totalhits") {
			faqs.sort(function(a, b) {
				let aHits = parseInt(a.totalhits);
				let bHits = parseInt(b.totalhits);
				if (dir === "asc") {
					return (aHits > bHits) ? 1 : (aHits < bHits) ? -1 : 0;
				} else if (dir === "desc") {
					return (aHits > bHits) ? -1 : (aHits < bHits) ? 1 : 0;
				}
			});
		} else if (sort === "alphabetical") {
			faqs.sort(function(a, b) {
				let aHits = a.question;
				let bHits = b.question;
				if (dir === "asc") {
					return (aHits > bHits) ? 1 : (aHits < bHits) ? -1 : 0;
				} else if (dir === "desc") {
					return (aHits > bHits) ? -1 : (aHits < bHits) ? 1 : 0;
				}
			});
		} else if (sort === "votes") {
			faqs.sort(function(a, b) {
				let aHits = parseInt(a.votes.yes);
				let bHits = parseInt(b.votes.yes);
				if (dir === "asc") {
					return (aHits > bHits) ? 1 : (aHits < bHits) ? -1 : 0;
				} else if (dir === "desc") {
					return (aHits > bHits) ? -1 : (aHits < bHits) ? 1 : 0;
				}
			});
		} else if (sort === "updated") {
			faqs.sort((a,b) => {
				return moment(b.updated).diff(moment(a.updated)) * (dir === "desc" ? 1 : -1)
			})
		} else if (sort === "created") {
			faqs.sort((a,b) => {
				return moment(b.created).diff(moment(a.created)) * (dir === "desc" ? 1 : -1)
			})
		}
		return faqs
	}
	handleSearch = (faqs, search) => {
		let curFaqs = faqs.filter((faq) =>
			(faq.question ? faq.question.toLowerCase() : "").includes(search.toLowerCase())
		)
		return curFaqs
	}
	handleTopics = (faqs, topics) => {
		let curFaqs = faqs.filter((faq) => {
			let topicsArr = [];
			faq.topics.map(({id}) => topicsArr.push(String(id)))
			if (topics.some(topic_id => topicsArr.includes(topic_id))) {
				return true
			} else {
				return false
			}
		})
		return curFaqs
	}
	renderCurFaqs = () => {
		const { faqs, options } = this.state;
		if (faqs) {
			let curFaqs = faqs;

			if (options.topcis && options.topics.length > 0) {
				curFaqs = this.handleTopics(curFaqs, options.topics)
			}
			curFaqs = this.handleSearch(curFaqs, options.search);
			curFaqs = this.handleSort(curFaqs, options.sort, options.order);

			this.setState({
				curFaqs: curFaqs,
			})
		}
	}

	toggleTopic = (topicId) => {
		let { options, topics } = this.state;
		if (topics.find(({topic_id}) => topic_id === topicId)) {
			if (!options.topics.includes(topicId)) {
				options.topics.push(topicId);
			} else {
				options.topics.splice(options.topics.findIndex(({topic_id}) => topic_id === topicId), 1)
			}
			this.updateOptions(options)
		}
	}

	updatePage = (newValue) => {
		let options = this.state.options;
		options.page = newValue
		this.updateOptions(options)
	}
	nextPage = () => {
		let { faqs, options } = this.state;
		options.page = options.page+1 >= Math.ceil(faqs.length / options.itemsPerPage) ? options.page : options.page+1
		this.updateOptions(options)
	}
	prevPage = () => {
		let { faqs, options } = this.state;
		options.page = options.page-1 < 0 ? options.page : options.page-1
		this.updateOptions(options)
	}
	updateOptions = (options) => {
		this.setState({
			options: options,
		}, () => {
			this.renderCurFaqs();
		})
	}

	render() {
		const { faqs, topics, curFaqs, options } = this.state;

		return (
			<div className="faq-list-container">
				{ this.props.controls &&
					<FAQControls
						faqs={faqs}
						curFaqs={curFaqs}
						options={options}
						onChange={this.updateOptions}
					/>
				}
				<Restrict width={this.props.width}>
					{ options.topics &&
						<div className="topiccontrols">
							<h2>Topics</h2>
							<ul>
								{ topics && topics.map((topic, t) => {
									return(
										<li className="noselect" onClick={() => {this.toggleTopic(topic.topic_id)}}>
											<p>
												<Checkbox onClick={() => {this.toggleTopic(topic.topic_id)}} toggled={options.topics.includes(topic.topic_id) ? true : false}/>
												{topic.name}
											</p>
										</li>
									)
								})}
							</ul>
						</div>
					}
					<div className="faq-list" style={{width: this.props.controls ? "calc(100% - 275px)" : "100%"}}>
						{ this.props.title &&
							<h1>{this.props.title}</h1>
						}

						{ this.props.controls &&
							<PageControls
								options={options}
								onSelect={this.updatePage}
								prevPage={this.prevPage}
								nextPage={this.nextPage}
								faqs={faqs}
								curFaqs={curFaqs}
							/>
						}
							
						{[...Array(options.itemsPerPage)].map((item, i) => {
							let faq = null
							try {
								if (curFaqs !== null && curFaqs.length > 0) {
									faq = curFaqs[(options.itemsPerPage * options.page) + i]
								} else {
									faq = faqs[(options.itemsPerPage * options.page) + i]
								}
							} catch(err) {
								console.log(err)
							}
							if (faq) {
								return(
									<FAQListItem
										faq={faq}
										noTags={this.props.noTags}
									/>
								)
							}
						})}

						{ this.props.controls &&
							<PageControls
								options={options}
								onSelect={this.updatePage}
								prevPage={this.prevPage}
								nextPage={this.nextPage}
								faqs={faqs}
								curFaqs={curFaqs}
								isBottom={true}
							/>
						}
					</div>
				</Restrict>
			</div>
		);
	}	
}
