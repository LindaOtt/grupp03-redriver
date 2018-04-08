import React, { Component } from 'react';
import _ from 'lodash';
import { HubConnection } from '@aspnet/signalr';
import VideoIcon from 'react-icons/lib/md/videocam';
import VoiceIcon from 'react-icons/lib/md/local-phone';

import PeerConnection from './PeerConnection';
import CallWindow from './CallWindow';
import CallModal from './CallModal';

import '../App.css';

const deployUrl = '';
const localUrl = 'http://localhost:5000/videochat';
const deployUrlWebRtc = '';
const localUrlWebRtc = 'http://localhost:5000/webrtc';

let userConnection = new HubConnection(localUrl);
let rtcConnection = new HubConnection(localUrlWebRtc);

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
            callFrom: '',
        };

        this.handleUsers = this.handleUsers.bind(this);
        this.pc = {};
        this.config = null;
        this.startCall = this.startCall.bind(this);
        this.endCall = this.endCall.bind(this);
        this.rejectCall = this.rejectCall.bind(this);
    }

    handleUsers() {

        userConnection.start()
            .then(() => {
                userConnection.invoke('UserInfo', this.props.name);
            });

        userConnection.on('Open', (data) => {

            this.createUserList(data);

        });

        userConnection.on('Close', (data) => {

            this.createUserList(data);

        });

        userConnection.on('request', (data) => {

            console.log(data);

            this.setState({ callModal: 'active', callFrom: data })
        });

        userConnection.on('call', (data) => {
            if (data.data.sdp) {
                this.pc.setRemoteDescription(data.data.sdp);
                if (data.data.sdp.type === 'offer') this.pc.createAnswer();
            } else this.pc.addIceCandidate(data.data.candidate);
        });

        userConnection.on('end', this.endCall.bind(this, false))
    }

    createUserList(data) {

        console.log(data);
        let tempArr = [];

        for (let i = 0; i < data.length; i++) {

            tempArr.push(<li className="UserList-li">
                            <p>{data[i].username}</p>
                            <div className="CallButtons">
                                <button className="Button" onClick={this.callWithVideo(true, data[i].connectionID)}><VideoIcon size={15}/></button>
                                <button className="Button" onClick={this.callWithVideo(true, data[i].connectionID)}><VoiceIcon size={15}/></button>
                            </div>
                        </li>);
        }
        this.setState({
            users: tempArr,
        })
    }

    callWithVideo(video, friendID) {
        const config = {audio: true};
        config.video = video;
        return () => this.startCall(true, friendID, config);
    }

    startCall(isCaller, friendID, config) {
        this.config = config;

        console.log(friendID);
        console.log(config);

        this.pc = new PeerConnection(friendID, userConnection)
            .on('localStream', (src) => {
                const newState = { callWindow: 'active', localSrc: src };
                if (!isCaller) newState.callModal = '';
                this.setState(newState);
            })
            .on('peerStream', src => this.setState({ peerSrc: src }))
            .start(isCaller, config);
    }

    rejectCall() {
        userConnection.invoke('End', this.state.callFrom);
        this.setState({ callModal: '' });
    }

    endCall(isStarter) {

        console.log(isStarter);

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
        this.handleUsers();
    }

    render() {

        return (
            <div className="VideoChat-Main">
                {this.state.users.length > 0 ? (
                    <div className="VideoChat-Main">
                        <div className="UserList">
                            <h3>Connected users</h3>
                            <ul className="UserList-Ul">{this.state.users}</ul>
                        </div>
                        <div className="VideoChat">
                            <CallWindow
                                status={this.state.callWindow}
                                localSrc={this.state.localSrc}
                                peerSrc={this.state.peerSrc}
                                config={this.config}
                                mediaDevice={this.pc.mediaDevice}
                                endCall={this.endCall}
                            />
                        </div>
                        <CallModal
                            status={this.state.callModal}
                            startCall={this.startCall}
                            rejectCall={this.rejectCall}
                            callFrom={this.state.callFrom}
                        />
                    </div>
                ) : (
                    <h3>No users connected</h3>
                    )}
            </div>
        );
    }
}

export default VideoChat;