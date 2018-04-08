import React, { Component } from 'react';

class CallModal extends Component {
    acceptWithVideo(video) {
        const config = { audio: true, video };
        return () => this.props.startCall(false, this.props.callFrom, config);
    }

    render() {
        return (
            <div >
                <p>
                    <span className="caller">{this.props.callFrom}</span> is calling ...
                </p>
                <button
                    className="btn-action fa fa-video-camera"
                    onClick={this.acceptWithVideo(true)}
                />
                <button
                    className="btn-action fa fa-phone"
                    onClick={this.acceptWithVideo(false)}
                />
                <button
                    className="btn-action hangup fa fa-phone"
                    onClick={this.props.rejectCall}
                />
            </div>
        );
    }
}


export default CallModal;
