import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ResultsList extends Component {
  static propTypes = {
    results: PropTypes.array.isRequired
  };

  render() {
    return (
      <ul>
        {this.props.results.length > 0 ? (
          this.props.results.map((result, index) => {
            return <li key={index}> {result.name}</li>;
          })
        ) : (
          <li>There are no results</li>
        )}
      </ul>
    );
  }
}
