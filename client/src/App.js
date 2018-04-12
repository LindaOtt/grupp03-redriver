import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import grey from 'material-ui/colors/grey';
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
              <AppBar
                  position="static"
                  style={styles.root}
              >
                  <Toolbar>
                      <Typography
                          variant="title"
                          color="inherit"
                          style={styles.flex}
                      >

                      </Typography>
                      <IconButton color="inherit" aria-label="Menu">
                          <MenuIcon />
                      </IconButton>
                  </Toolbar>
              </AppBar>
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

const primaryColor = grey[400];

const styles = {
    root: {
        flexGrow: 1,
        backgroundColor: primaryColor,
    },
    flex: {
        flex: 1,
    },
};