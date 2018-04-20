import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

// Import styles. ChatListStyles for all imported components with a style attribute and CSS-file for classNames and id.
import {friendRequestStyles} from "../../styles/FriendsStyles";
import '../../styles/Styles.css'

/**
 *  FriendsList-component. Starting page of friends.
 *
 *  @author Jimmy
 */

class FriendRequests extends Component {
    render() {

        if (this.props.state.isSignedIn === false) {
            return <Redirect to="/login" />
        }

        return (
            <div className="FriendsRequests">
                <p>Friend Requests</p>
            </div>

        );
    }
}

export default FriendRequests;