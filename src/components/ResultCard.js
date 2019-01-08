import React, { Component } from 'react';

export default class componentName extends Component {
  render() {
    const { name, formatted_address } = this.props.result;
    return (
      <div className="card">
        <div className="card-content">
          <strong>{name}</strong>
          <p>{formatted_address}</p>
        </div>
      </div>
    );
  }
}
