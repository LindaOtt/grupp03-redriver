import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import './App.css';

import ChatList from './component/chat/ChatList';
import FriendsList from './component/friends/FriendsList';
import Settings from './component/settings/Settings';
import Login from './component/authentication/Login';
import Register from './component/authentication/Register';

class App extends Component {
  render() {
    return (
        <Router>
          <div className="App">
            <header className="App-header">
              <h1 className="App-title">Red River</h1>
            </header>
              <div className="Body">
                  <Route path="/" exact={true} component={() => <ChatList state={this.state}/>}/>
                  <Route path="/friends" component={() => <FriendsList state={this.state}/>}/>
                  <Route path="/settings" component={() => <Settings state={this.state}/>}/>
                  <Route path="/login" component={() => <Login state={this.state}/>}/>
                  <Route path="/register" component={() => <Register state={this.state}/>}/>
              </div>
          </div>
        </Router>
    );
  }
}

export default App;
