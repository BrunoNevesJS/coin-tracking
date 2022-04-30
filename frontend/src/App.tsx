import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const ws = new WebSocket('ws://localhost:8998/')

  ws.onopen = (event: any) => {
    console.log(event)
  };

  ws.onmessage = (event: MessageEvent) => {
    console.log(JSON.parse(event.data))
  };


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
