import React, { Component } from 'react';
import VideoIcon from 'react-icons/lib/md/videocam';
import VoiceIcon from 'react-icons/lib/md/keyboard-voice';
import EndCall from 'react-icons/lib/md/call-end';

import '../App.css';

class CallModal extends Component {

    acceptWithVideo(video) {
        const config = { audio: true, video };
        return () => this.props.startCall(false, this.props.callFrom, config);
    }

    render() {
        return (
            <div className="CallModal">
                <p>{this.props.callFrom} is calling ...</p>
                <button
                    className="CallModal-Button-Active"
                    onClick={this.acceptWithVideo(true)}
                >
                    <VideoIcon size={15}/>
                </button>
                <button
                    className="CallModal-Button-Active"
                    onClick={this.acceptWithVideo(false)}
                >
                    <VoiceIcon size={15}/>
                </button>
                <button
                    className="CallModal-Button"
                    onClick={this.props.rejectCall}
                >
                    <EndCall size={15}/>
                </button>
            </div>
        );
    }
}


export default CallModal;
