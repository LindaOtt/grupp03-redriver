import React, { Component } from 'react';

// Import styles. ChatListStyles for all imported components with a style attributes and CSS-file for classNames and id.
import {friendsListStyles} from "../../styles/FriendsStyles";
import '../../styles/Styles.css'

/**
 *  FriendsList-component. Starting page of friends.
 *
 *  @author Jimmy
 */

class FriendsList extends Component {
    render() {
        return (
            <div className="FriendsList">
                <p>Friends list</p>
            </div>

        );
    }
}

export default FriendsList;