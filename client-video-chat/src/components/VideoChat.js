import React, { Component } from 'react';
import _ from 'lodash';
import { HubConnection } from '@aspnet/signalr';

import '../App.css';

const deployUrl = '';
const localUrl = 'http://localhost:5000/videochat';

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

        this.handleUsers = this.handleUsers.bind(this);
        /*this.pc = {};
        this.config = null;
        this.startCallHandler = this.startCall.bind(this);
        this.endCallHandler = this.endCall.bind(this);
        this.rejectCallHandler = this.rejectCall.bind(this);*/
    }

    handleUsers() {

        let queryString = '?username=' + this.props.name + '&webrtcurl=' + this.state.localSrc;

        let connection = new HubConnection(localUrl + queryString);

        connection.on('Open', (data) => {
            console.log(data);

            let tempArr = [];

            for (let i = 0; i < data.length; i++) {
                tempArr.push(<li><button type="button" key={i.WebRtcId} >Call {i.usrname}</button></li>);
            }
            this.setState({
                users: tempArr,
            })

        });

        connection.on('Close', (data) => {
            console.log(data);

            let tempArr = [];

            for (let i = 0; i < data.length; i++) {
                tempArr.push(<li><button type="button" key={i.WebRtcId} >Call {i.usrname}</button></li>);
            }
            this.setState({
                users: tempArr,
            })

        });
        connection.start();


    }

    /*startCall(isCaller, friendID, config) {
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
    }*/

    componentWillMount() {
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