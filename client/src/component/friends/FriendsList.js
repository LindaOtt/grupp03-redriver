import React, { Component } from 'react';

import {friendsListStyles} from "../../styles/FriendsStyles";

class FriendsList extends Component {
    render() {
        return (
            <div style={friendsListStyles.friendsList}>
                <p>Friends list</p>
            </div>

        );
    }
}

export default FriendsList;