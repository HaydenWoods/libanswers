import React, { Component } from 'react'

import './Restrict.scss';

export default class Restrict extends Component {
  render() {
    return (
      <div className={`restrict`} style={{
      	width: this.props.width ? this.props.width : "",
      	margin: this.props.width ? "unset" : ""
      }}>
        {this.props.children}
      </div>
    )
  }
}