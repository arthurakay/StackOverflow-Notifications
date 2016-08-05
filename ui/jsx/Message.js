import React from 'react';

class Message extends React.Component {
    render() {
        return (
            <div className="inboxMsg">
                <div className="inboxMsgMeta">
                    <div className="inboxMsgMeta-left">
                        {this.props.type}
                    </div>

                    <div className="inboxMsgMeta-right">
                        {new Date(this.props.date * 1000).toUTCString()}
                    </div>
                </div>

                <div className="inboxMsgContent">
                    <a href={this.props.url} target="_blank">{this.props.title}</a>
                </div>
            </div>
        );
    }
}

module.exports = Message;