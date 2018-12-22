import React, { Component } from 'react';
import styled from 'styled-components';

import './global.css';

class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <Split>
        <CodeWindow>
          <div className="App">Hello World</div>
        </CodeWindow>
      </Split>
    );
  }
}

export default App;

const Split = styled.div`
  display: flex;
  height: 100vh;
`;

const CodeWindow = styled.div`
  flex: 1;
  position: relative;
  background-color: var(--background);
`;

const RenderedWindow = styled.div`
  background-color: var(--background);
  width: 45%;
  padding: 20px;
  color: white;
  border-left: 1px solid #302b3a;
  overflow-y: scroll;
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: #82d8d8;
  }
  h1 {
    border-bottom: solid 3px var(--highlight);
    padding-bottom: 10px;
  }
  a {
    color: var(--highlight);
  }
`;

const LoadFile = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: var(--background);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #302b3a;
  h1 {
  }
`;

const DirectoryMenu = styled.div`
  background-color: #140f1d;
  border-right: solid 1px #302b3a;
  display: flex;
  flex-direction: column;
  position: relative;
  width: 20%;
  &:after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    pointer-events: none;
    box-shadow: -10px 0px 20px rgba(0, 0, 0, 0.3) inset;
  }
`;

const FileButton = styled.button`
  background-color: #140f1d;
  color: ${props => (props.active ? 'white' : 'rgba(255, 255, 255, 0.6)')};
  font-weight: bold;
  border-top: 0px;
  border-left: ${props => (props.active ? '3px solid white' : '0px')};
  border-right: 0px;
  border-bottom: solid 1px #302b3a;
  padding: 20px;
  text-align: left;
  transition: all 0.3s ease-in-out;
  outline: none;
  &:hover {
    border-left: 3px solid white;
    color: white;
  }
`;
