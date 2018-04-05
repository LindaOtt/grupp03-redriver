import React, { Component } from 'react';
import _ from 'lodash';

import '../App.css';

import socket from './Socket';
import PeerConnection from './PeerConnection';

class VideoChat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            clientId: '',
            users: [],
            callWindow: '',
            callModal: '',
            localSrc: null,
            peerSrc: null,
        };

        this.pc = {};
        this.config = null;
        this.handleUsers = this.handleUsers.bind(this);
        this.startCallHandler = this.startCall.bind(this);
        this.endCallHandler = this.endCall.bind(this);
        this.rejectCallHandler = this.rejectCall.bind(this);
    }

    handleUsers() {

        let arr = ['jimmy', 'andrew', 'sophia', 'linda'];

        arr.forEach((i) => {
            this.state.users.push(<li><button type="button">Call {i}</button></li>);
        });
    }

    startCall(isCaller, friendID, config) {
        this.config = config;
        this.pc = new PeerConnection(friendID)
            .on('localStream', (src) => {
                const newState = { callWindow: 'active', localSrc: src };
                if (!isCaller) newState.callModal = '';
                this.setState(newState);
            })
            .on('peerStream', src => this.setState({ peerSrc: src }))
            .start(isCaller, config);
    }

    rejectCall() {
        socket.emit('end', { to: this.state.callFrom });
        this.setState({ callModal: '' });
    }

    endCall(isStarter) {
        if (_.isFunction(this.pc.stop)) this.pc.stop(isStarter);
        this.pc = {};
        this.config = null;
        this.setState({
            callWindow: '',
            localSrc: null,
            peerSrc: null
        });
    }


    componentDidMount() {
        socket
            .on('init', data => this.setState({ clientId: data.id }))
            .on('request', data => this.setState({ callModal: 'active', callFrom: data.from }))
            .on('call', (data) => {
                if (data.sdp) {
                    this.pc.setRemoteDescription(data.sdp);
                    if (data.sdp.type === 'offer') this.pc.createAnswer();
                } else this.pc.addIceCandidate(data.candidate);
            })
            .on('end', this.endCall.bind(this, false))
            .emit('init');
    }

    componentWillMount() {
        this.handleUsers();
    }

    componentWillUpdate() {
        this.handleUsers();
    }

    render() {

        return (
            <div className="UserList">
                {this.state.users.length > 0 ? (
                    <div className="UserList">
                        <h3>Connected users</h3>
                        <ul className="UserList-Ul">{this.state.users}</ul>
                    </div>
                ) : (
                    <h3>No users connected</h3>
                    )}
            </div>
        );
    }
}

export default VideoChat;