import React, { Component } from 'react';

import Message from './Message';

class Messages extends Component {
    componentDidUpdate() {
        const objDiv = document.getElementById('messageList');
        objDiv.scrollTop = objDiv.scrollHeight;
    }

    render() {
        const messages = this.props.messages.map((message, i) => {
            return(
                <Message
                    key={i}
                    username={message.username}
                    message={message.message}
                    fromMe={message.fromMe}
                />
            );
        });

        return (
            <div className="messages" id="messageList">
                { messages }
            </div>
        );
    }
}

export default Messages;