import React, { Component } from 'react';

// Import styles. ChatListStyles for all imported components with a style attributes and CSS-file for classNames and id.
import {ChatListStyles} from "../../styles/ChatStyles";
import '../../styles/Styles.css'

/**
 *  ChatList-component. Starting page of chat.
 *
 *  @author Jimmy
 */

class ChatList extends Component {
    render() {
        return (
            <div className="ChatList">
                <p>Chat list</p>
            </div>

        );
    }
}

export default ChatList;