import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

// Import NPM-modules
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

// Import styles. userAccountStyles for all imported components with a style attribute and CSS-file for classNames and id.
import {userAccountStyles} from "../../styles/AccountStyles";
import '../../styles/Styles.css'

/**
 *  ChatList-component. Starting page of chat.
 *
 *  @author Jimmy
 */

class UserAccount extends Component {

    constructor(props){
        super(props);

        this.state = {
            name: 'Red River', // Change when API-requests are done!
        };

    }

    render() {

        if (this.props.state.isSignedIn === false) {
            return <Redirect to="/login" />
        }

        return (
            <div className="UserAccount">
                <Typography
                    variant="headline"
                    color="textSecondary"
                    align="left"
                    style={userAccountStyles.title}
                >
                    Hej, {this.props.state.userInfo.username}!
                </Typography>
                <p className="AccountSecondTitle">Kom igång genom att skicka ett meddelande nedan.</p>
                <div className="UserAccountButtonDiv">
                    <Button variant="raised"
                            style={userAccountStyles.button}
                            component={Link}
                            to="/chats"
                    >
                        Mina chattrum
                    </Button>
                    <Button variant="raised"
                            style={userAccountStyles.button}
                            component={Link}
                            to="/friends"
                    >
                        Mina vänner
                    </Button>
                    <Button variant="raised" style={userAccountStyles.button} /*onClick={}*/>
                        Starta videosamtal
                    </Button>
                    <Button variant="raised" style={userAccountStyles.button} /*onClick={}*/>
                        Starta livesändning
                    </Button>
                </div>
            </div>

        );
    }
}

export default UserAccount;