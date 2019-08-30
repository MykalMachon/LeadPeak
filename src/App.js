import React, { useState } from 'react';

import './global.css';
import ResultsList from './components/ResultsList';
import SearchBar from './components/SearchBar';

const { ipcRenderer } = window.require('electron');

const App = () => {
  const [resultsData, setResultsData] = useState({
    results: [],
    nextPageToken: null,
  });

  const [isSearchCompleted, setIsSearchCompleted] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ? IPC LISTENERS : LISTENS FOR DATA FROM THE MAIN THREAD

  // * On Map Data Response from the main process this function is called
  ipcRenderer.on('maps-data-res', (event, data) => {
    const { results, next_page_token } = data;
    setResultsData({ results: results, nextPageToken: next_page_token });
    searchSuccess();
  });

  // * On Export Completion from the main process this function is called
  ipcRenderer.on('export-data-res', (event, data) => {
    const submitButton = document.querySelector('#export');
    submitButton.classList.remove('is-loading');
  });

  // * Is called when the Cancel button is pressed, clears data and fields
  const searchSuccess = () => {
    setIsSearchCompleted(true);
    const submitButton = document.querySelector('#submit');
    submitButton.classList.remove('is-loading');
  };

  return (
    <div>
      <SearchBar isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <section className='section'>
        <div className='container'>
          <ResultsList
            results={resultsData.results}
            nextPageToken={resultsData.nextPageToken}
            loading={isSearchCompleted === false}
          />
        </div>
      </section>
    </div>
  );
};

export default App;
