import React, { Component } from 'react';

import '../global.css';
import PropTypes from 'prop-types';

export default class SettingsModal extends Component {
  constructor() {
    super();
    this.state = {
      isActive: true
    };
  }

  componentWillReceiveProps() {
    this.setState({
      isOpen: this.props.isActive
    });
    const modalDiv = document.querySelector('#modalContainer');
    modalDiv.classList.add('is-active');
  }

  closeModal = () => {
    this.setState({
      isOpen: false
    });
    const modalDiv = document.querySelector('#modalContainer');
    modalDiv.classList.remove('is-active');
  };

  render() {
    return (
      <div className="modal" id="modalContainer">
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Settings</p>
            <button
              className="delete"
              aria-label="close"
              onClick={this.closeModal}
            />
          </header>
          <section className="modal-card-body">
            <div className="field">
              <h2>API Keys and Credentials</h2>
              <p>
                These keys are used for getting the location information (google
                maps api key) and the email information (hunter.io api key)
              </p>
            </div>

            <div className="field">
              <label className="label">Google Maps API Key</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Paste your API Key here..."
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Hunter.io API Key</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Paste your API Key here..."
                />
              </div>
            </div>
          </section>
          <footer className="modal-card-foot">
            <button className="button is-primary">Save changes</button>
            <button className="button is-light" onClick={this.closeModal}>
              Cancel
            </button>
          </footer>
        </div>
      </div>
    );
  }
}

SettingsModal.propTypes = { isActive: PropTypes.bool.isRequired };
