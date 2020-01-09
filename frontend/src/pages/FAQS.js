import React, { Component } from 'react';
import axios from "axios";
import qs from 'qs';

import Layout from "../components/Layout"
import Restrict from "../components/Restrict"
import FAQList from "../components/FAQList";

export default class FAQS extends Component {
	constructor(props) {
		super(props)
		this.state = {
			faqs: null,
			options: {
				sort: "totalhits",
				order: "desc",
				itemsPerPage: 10,
				page: 0,
				search: this.props.location.defaultSearch ? this.props.location.defaultSearch : "",
				topics: [

				]
			}
		}
	}

	componentDidMount() {
		let { sort, order, page, limit, search } = this.state
		let data = { sort, order, page, limit }
		let queryString = qs.stringify(data)

		axios
		.get(`//localhost:3001/api/faqs?${queryString}`)
		.then(res => {
			let faqs = res.data.payload;
			this.setState({ 
				faqs: faqs 
			})
		})
		.catch(error => this.setState({ error }));

		axios
		.get(`//localhost:3001/api/topics`)
		.then(res => {
			let topics = res.data.payload.topics;
			this.setState({ 
				topics: topics 
			})
		})
		.catch(error => this.setState({ error }));
	}

	render() {
		let { faqs, topics, options } = this.state;
		return (
			<Layout>
				{ faqs && topics &&
					<FAQList
						faqs={faqs}
						topics={topics}
						options={options}
						controls={true}
						noTags={false}
					/>
				}
			</Layout>
		);
	}
}