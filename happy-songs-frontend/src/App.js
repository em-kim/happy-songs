import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  componentDidMount(){
    fetch('/test').then(function(webObj){
      return  webObj.json();
    }).then(function(data){
      console.log(data)
    });
    fetch('/spotify').then((webObj)=>{
      return webObj.json();
    }).then((data)=>{
      console.log(data);
    })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
