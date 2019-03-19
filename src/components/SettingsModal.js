import React, { Component } from 'react';
import '../global.css';
import PropTypes from 'prop-types';

const { ipcRenderer } = window.require('electron');

class SettingsModal extends Component {
  constructor() {
    super();
    this.state = {
      isActive: true,
      gmapsKey: '',
      hunterioKey: ''
    };
    ipcRenderer.send('api-key-req');

    ipcRenderer.on('api-key-res', (event, data) => {
      this.setState({
        gmapsKey: data.gmapsKey,
        hunterioKey: data.hunterioKey,
        newGmapsKey: data.gmapsKey,
        newHunterioKey: data.hunterioKey
      });
    });
  }

  componentWillReceiveProps() {
    this.setState({
      isOpen: this.props.isActive
    });
    ipcRenderer.send('api-key-req');
    const modalDiv = document.querySelector('#modalContainer');
    modalDiv.classList.add('is-active');
  }

  handleInput = event => {
    this.setState({
      [event.currentTarget.id]: event.currentTarget.value
    });
  };

  closeModal = () => {
    this.setState({
      isOpen: false
    });
    const modalDiv = document.querySelector('#modalContainer');
    modalDiv.classList.remove('is-active');
  };

  saveSettings = () => {
    const newSettings = {
      gmapsKey: this.state.newGmapsKey.trim(),
      hunterioKey: this.state.newHunterioKey.trim()
    };
    ipcRenderer.send('api-key-update-req', newSettings);
    this.closeModal();
  };

  render() {
    return (
      <div className="modal" id="modalContainer">
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Settings</p>
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
                  id="newGmapsKey"
                  onChange={this.handleInput}
                  value={this.state.newGmapsKey}
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
                  id="newHunterioKey"
                  onChange={this.handleInput}
                  value={this.state.newHunterioKey}
                  placeholder="Paste your API Key here..."
                />
              </div>
            </div>
          </section>
          <footer className="modal-card-foot">
            <button className="button is-primary" onClick={this.saveSettings}>
              Save changes
            </button>
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

export default SettingsModal;
