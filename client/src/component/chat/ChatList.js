import React, { Component } from 'react';

import {ChatListStyles} from "../../styles/ChatStyles";

class ChatList extends Component {
    render() {
        return (
                <div style={ChatListStyles.chatList}>
                    <p>Chat list</p>
                </div>

        );
    }
}

export default ChatList;