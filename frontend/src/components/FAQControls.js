import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from "moment";
import _ from 'lodash'

import Restrict from "./Restrict"
import Input from "./Input"
import Dropdown from "./Dropdown"
import PageControls from "./PageControls"

import "./FAQControls.scss"

export default class FAQControls extends Component {
	constructor(props) {
		super(props)
		this.state = {
			faqs: this.props.faqs,
			curFaqs: this.props.curFaqs,
			options: this.props.options,
		}

		this.props.onChange(this.state.options)
	}

	static getDerivedStateFromProps(newProps, prevState) {
		if (!_.isEqual(newProps.faqs, prevState.faqs)) {
			return {faqs: newProps.faqs}
		}
		if (!_.isEqual(newProps.curFaqs, prevState.curFaqs)) {
			return {curFaqs: newProps.curFaqs}
		}
		return null
	}	
	updateSearch = (newValue) => {
		let options = this.state.options;
		options.search = newValue
		this.setState({
			options: options
		}, () => {
			this.props.onChange(this.state.options)
		});
	}
	updateSort = (newValue) => {
		let options = this.state.options;
		options.sort = newValue;
		options.page = 0;
		this.setState({
			options: options
		}, () => {
			this.props.onChange(this.state.options)
		});
	}
	updateSortDir = (newValue) => {
		let options = this.state.options;
		options.order = newValue;
		this.setState({
			options: options
		}, () => {
			this.props.onChange(this.state.options)
		});
	}
	updateItemsPerPage = (newValue) => {
		let options = this.state.options;
		options.itemsPerPage = newValue;
		options.page = 0;
		this.setState({
			options: options
		}, () => {
			this.props.onChange(this.state.options)
		});
	}

	render() {
		const { faqs, curFaqs } = this.state;
		const { sort, order, itemsPerPage, page, search } = this.state.options;

		return(
			<div className="faqcontrols">
				<div className="subheader">
					<Restrict>
						{ faqs && 
							<div className="searchcontrols">
								<Input
									onChange={this.updateSearch}
									defaultValue={search}
									placeholder="Search..."
								/>
								<Dropdown
									name="SortBy"
									options={[
										{
											display: "Total Views",
											value: "totalhits",
										},
										{
											display: "Alphabetical",
											value: "alphabetical",
										},
										{
											display: "Votes",
											value: "votes",
										}
									]}
									onSelect={this.updateSort}
									selected={0}
								/>
								<Dropdown
									name="ItemsPerPage"
									options={[
										{
											display: "10",
											value: 10,
										},
										{
											display: "25",
											value: 25,
										},
										{
											display: "50",
											value: 50,
										},
									]}
									onSelect={this.updateItemsPerPage}
									selected={0}
								/>
								<Dropdown
									name="SortDir"
									options={[
										{
											display: "Up",
											value: "asc",
										},
										{
											display: "Down",
											value: "desc",
										},
									]}
									onSelect={this.updateSortDir}
									selected={1}
								/>
							</div>	
						}
					</Restrict>
				</div>
				<div className="clear"></div>
			</div>
		);
	}
}