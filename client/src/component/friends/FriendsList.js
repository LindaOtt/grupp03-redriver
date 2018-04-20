import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

// Import NPM-modules
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';

// Import styles. ChatListStyles for all imported components with a style attribute and CSS-file for classNames and id.
import {friendsListStyles} from "../../styles/FriendsStyles";
import '../../styles/Styles.css'

/**
 *  FriendsList-component. Starting page of friends.
 *
 *  @author Jimmy
 */

class FriendsList extends Component {
    render() {

        if (this.props.state.isSignedIn === false) {
            return <Redirect to="/login" />
        }

        return (
            <div className="FriendRequests">
                <div className="FriendRequests-Header">
                    <Button color="primary" component={Link} to={'/friendrequests'}>
                        <Icon >add</Icon>
                        Lägg till vän
                    </Button>
                </div>
            </div>

        );
    }
}

export default FriendsList;