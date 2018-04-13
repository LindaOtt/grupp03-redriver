import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { MuiThemeProvider } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';

import ChatIcon from '@material-ui/icons/ChatBubble';
import PersonIcon from '@material-ui/icons/People';
import SettingsIcon from '@material-ui/icons/Settings';
import LoginIcon from '@material-ui/icons/Person';
import RegisterIcon from '@material-ui/icons/PersonAdd';

import './App.css';
import {appStyles, theme} from './styles/Styles';

import ChatList from './component/chat/ChatList';
import FriendsList from './component/friends/FriendsList';
import Settings from './component/settings/Settings';
import Login from './component/authentication/Login';
import Register from './component/authentication/Register';
import NewPassword from './component/authentication/NewPassword';

class App extends Component {

    constructor(props){
        super(props);

        this.state = {
            menu: false,
        };
    }

    renderMenu =  () => {
        return (
            <div style={appStyles.menu}>
                <List>
                    <ListItem
                        button
                        component={Link}
                        to="/"
                    >
                        <ListItemIcon>
                            <ChatIcon />
                        </ListItemIcon>
                        <ListItemText primary="Chat" />
                    </ListItem>
                    <ListItem
                        button
                        component={Link}
                        to="/friends"
                    >
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary="Vänner" />
                    </ListItem>
                    <ListItem
                        button
                        component={Link}
                        to="/settings"
                    >
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Inställningar" />
                    </ListItem>
                    <ListItem
                        button
                        component={Link}
                        to="/login"
                    >
                        <ListItemIcon>
                            <LoginIcon />
                        </ListItemIcon>
                        <ListItemText primary="Logga in" />
                    </ListItem>
                    <ListItem
                        button
                        component={Link}
                        to="/register"
                    >
                        <ListItemIcon>
                            <RegisterIcon />
                        </ListItemIcon>
                        <ListItemText primary="Registrera" />
                    </ListItem>
                </List>
                <Divider />
            </div>
        );

    };

    toggleMenu = (open) => () => {
        this.setState({
            menu: open,
        });
    };

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
                                  <MenuIcon onClick={this.toggleMenu(true)}/>
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
                      <Drawer anchor="right" open={this.state.menu} onClose={this.toggleMenu(false)}>
                          <div
                              tabIndex={0}
                              role="button"
                              onClick={this.toggleMenu(false)}
                              onKeyDown={this.toggleMenu(false)}
                          >
                              {this.renderMenu()}
                          </div>
                      </Drawer>
                  </div>
            </MuiThemeProvider>
        </Router>
    );
  }
}

export default App;
