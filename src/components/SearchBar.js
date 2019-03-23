import React, { Component } from 'react';
import SettingsModal from './SettingsModal';

const { ipcRenderer } = window.require('electron');

export default class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      results: [],
      inSearch: false,
      searchComplete: false,
      moreDetails: false,
      getEmails: false,
    };
  }

  // ? COMPONENT SPECIFIC FUNCTIONS

  // * Is called onChange for all text inputs, loads their values into state
  handleInput = event => {
    this.setState({
      [event.currentTarget.id]: event.currentTarget.value,
    });
  };

  // * Is called when the submit button is pressed, initiates a search
  submitSearch = event => {
    event.preventDefault();
    event.currentTarget.classList.add('is-loading');
    this.setState({
      inSearch: true,
    });
    // TODO Use IPC listener to make call to GoogleAPI
    ipcRenderer.send('map-data-req', this.state);
  };

  // * Is called when the Cancel button is pressed, clears data and fields
  clearFields = event => {
    event.preventDefault();
    const submitButton = document.querySelector('#submit');
    submitButton.classList.remove('is-loading');
    const inputs = [...document.querySelectorAll('input')];
    inputs.forEach(input => {
      input.value = '';
    });
    this.setState({ results: [], searchComplete: false });
  };

  exportData = event => {
    event.preventDefault();
    event.currentTarget.classList.add('is-loading');
    ipcRenderer.send('export-data-req', this.state);
  };

  render() {
    return (
      <section
        className="section"
        style={{ backgroundColor: 'hsl(0, 0%, 96%)' }}
      >
        <SettingsModal
          isActive={this.state.settingsModalOpen}
          onClick={() => {
            this.setState({
              settingsModalOpen: !this.state.settingsModalOpen,
            });
          }}
        />
        <div className="container">
          <div className="field is-grouped columns">
            <div className="control column is-two-thirds">
              <label className="label">Search Area</label>
              <input
                id="searchArea"
                type="text"
                className="input"
                placeholder="Area to search"
                onChange={this.handleInput}
              />
            </div>
            <div className="control column is-one-third">
              <label className="label">Place Category</label>
              <input
                id="placeCategory"
                type="text"
                className="input"
                placeholder="Type of thing to find"
                onChange={this.handleInput}
              />
            </div>
          </div>

          <div className="level">
            <div className="level-left">
              <div className="field is-grouped">
                <div className="control">
                  <button
                    onClick={this.submitSearch}
                    className="button is-primary"
                    id="submit"
                  >
                    Submit
                  </button>
                </div>
                <div className="control">
                  <button
                    onClick={this.clearFields}
                    className="button is-light"
                    id="cancel"
                    disabled={!this.state.searchComplete}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
            <div className="level-right" />
            <div className="field is-grouped">
              <div className="control">
                <button
                  className="button is-light"
                  id="export"
                  onClick={this.exportData}
                  disabled={!this.state.searchComplete}
                >
                  Export Data
                </button>
              </div>

              <div className="control">
                <div className="dropdown is-right" id="dropdown">
                  <div className="dropdown-trigger">
                    <button
                      className="button is-light"
                      onClick={event => {
                        event.preventDefault();
                        document
                          .querySelector('#dropdown')
                          .classList.toggle('is-active');
                      }}
                      aria-haspopup="true"
                      aria-controls="dropdown-menu2"
                    >
                      <span>Details</span>
                    </button>
                  </div>
                  <div
                    className="dropdown-menu"
                    id="dropdown-menu2"
                    role="menu"
                  >
                    <div className="dropdown-content">
                      <div className="dropdown-item">
                        <label className="checkbox">
                          <input
                            type="checkbox"
                            onClick={() => {
                              this.setState({
                                moreDetails: !this.state.moreDetails,
                              });
                            }}
                          />{' '}
                          Get Lead Website
                        </label>
                      </div>
                      <div className="dropdown-item">
                        <label className="checkbox">
                          <input
                            disabled={!this.state.moreDetails}
                            type="checkbox"
                            onClick={() => {
                              this.setState({
                                getEmails: !this.state.getEmails,
                              });
                            }}
                          />{' '}
                          Get Lead Emails
                        </label>
                      </div>
                      <hr className="dropdown-divider" />
                      <div className="dropdown-item">
                        <p>These use Google Maps & Hunter.io</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="control">
                <button
                  className="button is-light"
                  onClick={() => {
                    this.setState({
                      settingsModalOpen: !this.state.settingsModalOpen,
                    });
                  }}
                >
                  Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
