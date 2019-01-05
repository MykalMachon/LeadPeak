import React, { Component } from 'react';

import './global.css';
import ResultsList from './components/ResultsList';

const { ipcRenderer } = window.require('electron');

class App extends Component {
  constructor() {
    super();
    this.state = {
      results: []
    };
    // * IPC Listeners
    ipcRenderer.on('maps-data-res', (event, data) => {
      this.setState({
        results: data
      });
      this.searchSuccess();
    });
  }

  handleInput = event => {
    this.setState({
      [event.currentTarget.id]: event.currentTarget.value
    });
  };

  // * UI Inputs

  submitSearch = event => {
    event.preventDefault();
    event.currentTarget.classList.add('is-loading');
    event.currentTarget.disabled = true;
    this.setState({
      inSearch: true
    });
    // TODO Use IPC listener to make call to GoogleAPI
    ipcRenderer.send('map-data-req', this.state);
  };

  clearFields = event => {
    event.preventDefault();
    const submitButton = document.querySelector('#submit');
    submitButton.classList.remove('is-loading');
    submitButton.disabled = false;
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
      input.value = '';
    });
  };

  searchSuccess = () => {
    this.setState({
      inSearch: false
    });
    const submitButton = document.querySelector('#submit');
    submitButton.classList.remove('is-loading');
    submitButton.disabled = false;
  };

  render() {
    return (
      <div>
        <section class="section">
          <div class="container">
            <div className="field is-grouped columns">
              <div className="control column is-two-thirds">
                <label class="label">Search Area</label>
                <input
                  id="searchArea"
                  type="text"
                  className="input"
                  placeholder="Area to search"
                  onChange={this.handleInput}
                />
              </div>
              <div className="control column is-one-third">
                <label class="label">Place Category</label>
                <input
                  id="placeCategory"
                  type="text"
                  className="input"
                  placeholder="Type of thing to find"
                  onChange={this.handleInput}
                />
              </div>
            </div>

            <div class="field is-grouped">
              <div class="control">
                <button
                  onClick={this.submitSearch}
                  class="button is-link"
                  id="submit"
                >
                  Submit
                </button>
              </div>
              <div class="control">
                <button onClick={this.clearFields} class="button is-text">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </section>
        <section>
          <ResultsList
            results={this.state.results}
            loading={this.state.inSearch}
          />
        </section>
      </div>
    );
  }
}

export default App;
