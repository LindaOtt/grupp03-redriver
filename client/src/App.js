import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom';

// Import NPM-modules
import { MuiThemeProvider } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Snackbar from 'material-ui/Snackbar';

// Import icons for the drawer-menu.
import ChatIcon from '@material-ui/icons/ChatBubble';
import PersonIcon from '@material-ui/icons/People';
import SettingsIcon from '@material-ui/icons/Settings';
import LoginIcon from '@material-ui/icons/Person';
import RegisterIcon from '@material-ui/icons/PersonAdd';
import LogoutIcon from '@material-ui/icons/Cancel';

// Import styles. appStyles for all imported components with a style attribute and CSS-file for classNames and id.
import './styles/Styles.css';
import {theme} from './styles/Styles';
import AppStyles from './styles/AppStyles';

// Import pages to use with React Router for navigation.
import ChatList from './component/chat/ChatList';
import FriendsList from './component/friends/FriendsList';
import Settings from './component/settings/Settings';
import Login from './component/authentication/Login';
import Register from './component/authentication/Register';
import NewPassword from './component/authentication/NewPassword';
import UserAccount from './component/account/UserAccount';

/**
 *  Starting point of the application
 *
 *  @author Jimmy
 */

class App extends Component {

    constructor(props){
        super(props);

        this.state = {
            menu: false,
            snackBar: false,
            snackBarMessage: '',
            isSignedIn: false,
            token: '',
        };
        this.openSnackBar = this.openSnackBar.bind(this);
        this.userLogout = this.userLogout.bind(this);
    }

    /**
     *  Logout. Delete token in local storage and change state.isSignedIn to false.
     *
     *  @author Jimmy
     */

    userLogout() {
        this.setState({
            isSignedIn: false,
        });
        localStorage.removeItem('token');
    }

    /**
     *  Open bottom-bar and display message. Closes after 3 seconds.
     *
     *  @author Jimmy
     */

    openSnackBar = (message) => {
        this.setState({
            snackBar: true,
            snackBarMessage: message,
        });

        setTimeout(() => {
            this.closeSnackBar();
        }, 3000);
    };

    /**
     *  Close bottom-bar and delete message.
     *
     *  @author Jimmy
     */

    closeSnackBar = () => {
        this.setState({
            snackBar: false,
            snackBarMessage: '',
        });
    };

    /**
     *  Render all links in drawer-menu.
     *
     *  @author Jimmy
     */

    renderMenu =  () => {
        return (
            <div style={AppStyles.menu}>
                <List>
                    <ListItem
                        button
                        component={Link}
                        to="/"
                    >
                        <ListItemIcon>
                            <LoginIcon />
                        </ListItemIcon>
                        <ListItemText primary="Start" />
                    </ListItem>
                    <ListItem
                        button
                        component={Link}
                        to="/chats"
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
                <ListItem
                    button
                    component={Link}
                    to="/"
                    onClick={this.userLogout}
                >
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logga ut" />
                </ListItem>
            </div>
        );

    };

    /**
     *  Open drawer-menu.
     *
     *  @author Jimmy
     */

    toggleMenu = (open) => () => {
        this.setState({
            menu: open,
        });
    };

    /**
     *  Check if valid token in local storage before component mounts.
     *
     *  @author Jimmy
     */

    componentWillMount() {

        if(localStorage.getItem('token')) {

            let token = JSON.parse(localStorage.getItem('token'));

            this.setState({
                token: token,
                isSignedIn: true,
            });
        }

    }

    /**
     *  Check if valid token in local storage before component updates.
     *
     *  @author Jimmy
     */

    componentWillUpdate() {

        if(localStorage.getItem('token')) {

            let token = JSON.parse(localStorage.getItem('token'));

            if (token !== this.state.token) {

                this.setState({
                    token: token,
                    isSignedIn: true,
                });
            }
        }

    }


    render() {

    return (
        <Router>
            <MuiThemeProvider theme={theme}>
                <div className="App">
                      <AppBar
                          position="sticky"
                          style={AppStyles.root}
                      >
                          <Toolbar>
                              <Typography
                                  variant="title"
                                  color="inherit"
                                  style={AppStyles.flex}
                              >
                              </Typography>
                              {this.state.isSignedIn ? (
                                  <IconButton color="inherit" aria-label="Menu" style={AppStyles.menuButton}>
                                      <MenuIcon onClick={this.toggleMenu(true)}/>
                                  </IconButton>
                              ) : (
                                  <p> </p>
                              )}
                          </Toolbar>
                      </AppBar>
                      <div className="Body">
                          <Route path="/" exact={true} component={() => <UserAccount state={this.state}/>}/>
                          <Route path="/chats" component={() => <ChatList state={this.state}/>}/>
                          <Route path="/friends" component={() => <FriendsList state={this.state}/>}/>
                          <Route path="/settings" component={() => <Settings state={this.state}/>}/>
                          <Route path="/login" component={() => <Login state={this.state} openSnackBar={this.openSnackBar}/>}/>
                          <Route path="/register" component={() => <Register state={this.state} openSnackBar={this.openSnackBar}/>}/>
                          <Route path="/password" component={() => <NewPassword state={this.state}/>}/>
                      </div>
                    <Snackbar
                        open={this.state.snackBar}
                        onClose={this.closeSnackBar}
                        SnackbarContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id">{this.state.snackBarMessage}</span>}
                    />
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
