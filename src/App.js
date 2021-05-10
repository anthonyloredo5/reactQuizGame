import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  //lets see whats up
  useEffect(() => {
    //going to use axios to get data from api once the document is rendered
    axios.get('https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean')
      .then((response) => {
        console.log(response, "reponse");
        console.log(response.data, "reponse.data");
        console.log(response.data.results, "reponse.data.results");
      })

  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
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
