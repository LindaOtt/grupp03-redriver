import React, { Component } from 'react';

// Import styles. friendsViewStyles for all imported components with a style attribute and CSS-file for classNames and id.
import {friendsViewStyles} from "../../styles/FriendsStyles";
import '../../styles/Styles.css'

/**
 *  FriendsView-component. View for a friends page. See info about friend,
 *  start a new chat and make a video call.
 *
 *  @author Jimmy
 */

class FriendsView extends Component {
    render() {
        return (
            <div className="FriendsView">
                <p>Friends View</p>
            </div>

        );
    }
}

export default FriendsView;