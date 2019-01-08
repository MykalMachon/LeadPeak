import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ResultCard from './ResultCard';

export default class ResultsList extends Component {
  constructor() {
    super();
    this.state = {
      results: [],
      nextPageToken: ''
    };
  }

  static propTypes = {
    results: PropTypes.array.isRequired,
    nextPageToke: PropTypes.string
  };

  componentWillReceiveProps() {
    this.setState({
      results: this.props.results,
      nextPageToken: this.props.nextPageToken
    });
  }

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
        {this.props.results.length > 0 ? (
          <div style={{ marginTop: 'calc(1.5rem - .75rem)' }}>
            <button className="button is-white"> Load More...</button>
          </div>
        ) : null}
      </div>
    );
  }
}
