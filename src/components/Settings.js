import React, { Component } from 'react';

export default class Settings extends Component {
  constructor() {
    super();
    this.state = {
      moreDetails: false,
      darkTheme: false
    };
  }

  render() {
    return (
      <div className="dropdown is-right" id="dropdown">
        <div className="dropdown-trigger">
          <button
            className="button is-light"
            onClick={event => {
              event.preventDefault();
              document.querySelector('#dropdown').classList.toggle('is-active');
            }}
            aria-haspopup="true"
            aria-controls="dropdown-menu2"
          >
            <span>Settings</span>
          </button>
        </div>
        <div className="dropdown-menu" id="dropdown-menu2" role="menu">
          <div className="dropdown-content">
            <div className="dropdown-item">
              <label className="checkbox">
                <input type="checkbox" /> Get More Info
              </label>
            </div>
            <hr className="dropdown-divider" />
            <div className="dropdown-item">
              <p>
                Designed by <br /> <code>Mykal Machon</code>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
