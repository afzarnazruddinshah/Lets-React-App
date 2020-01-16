

 componentDidMount()
 {
   this.getBloodReqs();
 }


getBloodReqs = () => {
    axios.get('http://localhost:3001/bloodreqs')
      .then(res => {
          console.log('Getting Blood Requests..');
          // console.log(res.data);
          this.setState(
            ()=> { return { bloodreqs: (res.data)};}
          );

      })
  }


  import React from 'react';
  import logo from './logo.svg';
  import './App.css';
  
  function App() {
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

  import React, { Component } from 'react';

  class App extends Component {
      state = { 

        messageFromAPI : ''

       }
      render() { 
          return (  );
      }
  }
   
  export default App;


  