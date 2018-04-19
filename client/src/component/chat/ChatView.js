import React, { Component } from 'react';

// Import styles. ChatViewStyles for all imported components with a style attribute and CSS-file for classNames and id.
import {ChatViewStyles} from "../../styles/ChatStyles";
import '../../styles/Styles.css'

/**
 *  ChatView-component. View for a single chat.
 *
 *  @author Jimmy
 */

class ChatView extends Component {
    render() {
        return (
            <div className="ChatView">
                <p>Chat</p>
            </div>

        );
    }
}

export default ChatView;