import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { MuiThemeProvider } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import './App.css';
import {appStyles, theme} from './styles/Styles';

import ChatList from './component/chat/ChatList';
import FriendsList from './component/friends/FriendsList';
import Settings from './component/settings/Settings';
import Login from './component/authentication/Login';
import Register from './component/authentication/Register';
import NewPassword from './component/authentication/NewPassword';

class App extends Component {
  render() {
    return (
        <Router>
            <MuiThemeProvider theme={theme}>
                  <div className="App">
                      <AppBar
                          position="static"
                          style={appStyles.root}
                      >
                          <Toolbar>
                              <Typography
                                  variant="title"
                                  color="inherit"
                                  style={appStyles.flex}
                              >

                              </Typography>
                              <IconButton color="inherit" aria-label="Menu" style={appStyles.menuButton}>
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
                          <Route path="/password" component={() => <NewPassword state={this.state}/>}/>
                      </div>
                  </div>
            </MuiThemeProvider>
        </Router>
    );
  }
}

export default App;
