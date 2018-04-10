import React, {Component} from 'react';
import * as signalr from '@aspnet/signalr-client/dist/browser/signalr-clientES5-1.0.0-alpha2-final';

const chatUrl = "https://redriverchatserver.azurewebsites.net/chat";
const chatLocalUrl = "http://localhost:49872/chat";

class Chat extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nick: '',
            message: '',
            messages: [],
            connection: null,
            key: 34332
        };

        this.sendMessage = this.sendMessage.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount = () => {

        this.state.connection = new signalr.HubConnection(chatUrl); // {transport: signalr.TransportType.LongPolling});

        this.state.connection.on('send', data => {
            console.log(data);
            this.state.messages.push(data);
            this.setState({key: Math.random()});
        });
        this.state.connection.start();
    }

    sendMessage() {
        this.state.connection.invoke("send", this.state.message);
    }

    handleChange(event) {
        this.setState({message: event.target.value});
    }

    render() {
        return (
            <section id="messages-list">
                <MessageList messages={this.state.messages} keya={this.state.key}/>
                <input value={this.state.message} type="text" onChange={this.handleChange}/>
                <button onClick={this.sendMessage}>Send Message</button>
            </section>
        );
    }
}

export default Chat;

function MessageList(props) {
    const messageList = props.messages;
    const listMessages = messageList.map((message) =>
        <li key={props.keya + Math.random()}>{message}</li>
    );
    return (
        <ul>{listMessages}</ul>
    );
}