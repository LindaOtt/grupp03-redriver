import React, { Component } from 'react';
import './App.css';

import VideoChat from './components/VideoChat';
import NameForm from './components/NameForm';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
        };
        this.handleNameSubmit = this.handleNameSubmit.bind(this)
    }

    handleNameSubmit(value) {

      this.setState({name: value,});
      sessionStorage.setItem('name', value);
    }

    componentWillMount() {

      if (sessionStorage.getItem('name')) {

          this.setState({name: sessionStorage.getItem('name'),});
      }
    }

  render() {
    return (
      <div className="App">
          {this.state.name ? (
              <div className="App">
                  <VideoChat/>
              </div>
          ) : (
              <NameForm handleNameSubmit={this.handleNameSubmit}/>
          )}
      </div>
    );
  }
}

export default App;
