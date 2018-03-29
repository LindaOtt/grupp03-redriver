import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
        <Router>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Red River</h1>
            </header>
              <div className="Body">
                  <Route path="/" exact={true}/>
                  <Route path="/login"/>
                  <Route path="/register"/>

              </div>
          </div>
        </Router>
    );
  }
}

export default App;
