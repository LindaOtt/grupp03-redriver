import React, { Component } from 'react';
//import classnames from 'classnames';
import _ from 'lodash';

import VideoIcon from 'react-icons/lib/md/videocam';
import VoiceIcon from 'react-icons/lib/md/keyboard-voice';
import EndCall from 'react-icons/lib/md/call-end';

import '../App.css';

class CallWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Video: true,
            Audio: true
        };

        this.btns = [
            { type: 'Video', icon: 'fa-video-camera' },
            { type: 'Audio', icon: 'fa-microphone' }
        ];
    }

    componentDidMount() {
        this.setMediaStream();
    }

    componentWillReceiveProps(nextProps) {
        // Initialize when the call started
        if (!this.props.config && nextProps.config) {
            const { config, mediaDevice } = nextProps;
            _.forEach(config, (conf, type) =>
                mediaDevice.toggle(_.capitalize(type), conf));

            this.setState({
                Video: config.video,
                Audio: config.audio
            });
        }
    }

    componentDidUpdate() {
        this.setMediaStream();
    }

    setMediaStream() {
        const { peerSrc, localSrc } = this.props;
        if (this.peerVideo && peerSrc) this.peerVideo.srcObject = peerSrc;
        if (this.localVideo && localSrc) this.localVideo.srcObject = localSrc;
    }

    /**
     * Turn on/off a media device
     * @param {String} deviceType - Type of the device eg: Video, Audio
     */
    toggleMediaDevice(deviceType) {
        this.setState({
            [deviceType]: !this.state[deviceType]
        });
        this.props.mediaDevice.toggle(deviceType);
    }

    renderControlButtons() {

        let tempArr = [];

        if (this.state.Audio === true) {

            tempArr.push(<button
                className="VideoControl-Button-Active"
                onClick={() => this.toggleMediaDevice('Audio')}
            >
                <VoiceIcon size={15}/>
            </button>)
        } else {
            tempArr.push(<button
                className="VideoControl-Button"
                onClick={() => this.toggleMediaDevice('Audio')}
            >
                <VoiceIcon size={15}/>
            </button>)
        }

        if (this.state.Video === true) {

            tempArr.push(<button
                className="VideoControl-Button-Active"
                onClick={() => this.toggleMediaDevice('Video')}
            >
                <VideoIcon size={15}/>
            </button>)
        } else {
            tempArr.push(<button
                className="VideoControl-Button"
                onClick={() => this.toggleMediaDevice('Video')}
            >
                <VideoIcon size={15}/>
            </button>)
        }
        return tempArr;
    }
    render() {
        const { status } = this.props;
        return (
            <div className="VideoContainer">
                <div className="VideoControl">
                    {this.renderControlButtons()}
                    <button
                        className="VideoControl-Button"
                        onClick={() => this.props.endCall(true)}
                    >
                        <EndCall size={15}/>
                    </button>
                </div>
                <video id="localVideo" ref={el => this.localVideo = el} autoPlay muted />
                <video id="peerVideo" ref={el => this.peerVideo = el} autoPlay />
            </div>
        );
    }
}

export default CallWindow;