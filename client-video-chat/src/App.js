import React, { Component } from 'react';
import './App.css';

import UserList from './components/UserList';
import VideoChat from './components/VideoChat';

class App extends Component {
  render() {
    return (
      <div className="App">
          <UserList/>
          <VideoChat/>
      </div>
    );
  }
}

export default App;
