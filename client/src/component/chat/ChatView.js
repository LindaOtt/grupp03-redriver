import React, { Component } from 'react';

import {ChatViewStyles} from "../../styles/ChatStyles";

class ChatView extends Component {
    render() {
        return (
            <div style={ChatViewStyles.chatView}>
                <p>Chat</p>
            </div>

        );
    }
}

export default ChatView;