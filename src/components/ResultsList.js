import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ResultCard from './ResultCard';

export default class ResultsList extends Component {
  static propTypes = {
    results: PropTypes.array.isRequired
  };

  render() {
    return (
      <div>
        {this.props.results.length > 0 ? (
          this.props.results.map((result, index) => {
            return <ResultCard key={index} result={result} />;
          })
        ) : (
          <p>There are no results</p>
        )}
      </div>
    );
  }
}
