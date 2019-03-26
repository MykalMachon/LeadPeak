import React, { Component } from 'react';

import './global.css';
import ResultsList from './components/ResultsList';
import SearchBar from './components/SearchBar';

const { ipcRenderer } = window.require('electron');

class App extends Component {
  constructor() {
    super();
    this.state = {
      results: [],
      settingsModalOpen: false,
    };

    // ? IPC LISTENERS : LISTENS FOR DATA FROM THE MAIN THREAD

    // * On Map Data Response from the main process this function is called
    ipcRenderer.on('maps-data-res', (event, data) => {
      const { results, next_page_token } = data;
      this.setState({
        results: results,
        nextPageToken: next_page_token,
      });
      // Reflect the query completion in the UI
      this.searchSuccess();
    });

    // * On Export Completion from the main process this function is called
    ipcRenderer.on('export-data-res', (event, data) => {
      const submitButton = document.querySelector('#export');
      submitButton.classList.remove('is-loading');
    });
  }

  // * Is called when the Cancel button is pressed, clears data and fields
  searchSuccess = () => {
    this.setState({
      inSearch: false,
      searchComplete: true,
    });
    const submitButton = document.querySelector('#submit');
    submitButton.classList.remove('is-loading');
  };

  render() {
    return (
      <div>
        <SearchBar />
        <section className="section">
          <div className="container">
            <ResultsList
              results={this.state.results}
              nextPageToken={this.state.nextPageToken}
              loading={this.state.inSearch}
            />
          </div>
        </section>
      </div>
    );
  }
}

export default App;
