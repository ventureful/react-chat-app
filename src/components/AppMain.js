import React, { Component } from 'react';
import '../styles/App.css';
import Messages from './Messages';
import ChatInput from './ChatInput';

import AWS from 'aws-sdk';
AWS.config.region = 'us-east-1'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:ac05c149-43c5-4837-a15f-c3cb1e9ea4b9'
});

const lexruntime = new AWS.LexRuntime();
const lexUserId = 'chatbot_demo' + Date.now();
let bot = 'BookTrip';

const lexRequest = ( messageObject, errorHandler, addMessageHandler)=> {
    let params = {
        botAlias: '$LATEST',
        botName: bot,
        inputText: messageObject.message,
        userId: lexUserId
    };

    lexruntime.postText(params, (err, data) => {
        if (err) {
            console.log(err, err.stack);
            errorHandler(err);
        } else {
            addMessageHandler(object.assign({},data, {username: 'Chat Bot'}));
        }
    })
};

class AppMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        };
        this.sendHandler = this.sendHandler.bind(this);
        this.sendHelloButtonMessage = this.sendHelloButtonMessage.bind(this);
        this.sendBookingButtonMessage = this.sendBookingButtonMessage.bind(this);
        this.clearMessages = this.clearMessages.bind(this);
        this.addMessage = this.addMessage.bind(this);
        this.addErrorMessage = this.addErrorMessage.bind(this);
    }

    sendHandler(message) {
        const messageObject = {
            fromMe : true,
            username : this.props.username,
            message
        };

        // adds a message to the array of messages that makes up the chat
        this.addMessage(messageObject);

        // sets parameters for the postText request to AWS lex
        lexRequest( messageObject, this.addErrorMessage, this.addMessage, this.state);
    }

    addMessage(message) {
        // Appends a new message to the component state
        const messages = this.state.messages;
        messages.push(message);
        this.setState({ messages });
    }

    addErrorMessage(err) {
        const errorMessage = {
            username : 'Chat Bot',
            message: 'Error: ' + err.message + ' (see console for details)'
        };
        // Appends an error message to the component state
        const messages = this.state.messages;
        messages.push(errorMessage);
        this.setState({ messages });
    }

    clearMessages() {
        const messages = [];
        this.setState({ messages });
    }

    render() {
        return (
            <div className="container">
                <Messages messages={this.state.messages} />
                <Clear clearMessages={this.clearMessages}/>
                <ChatInput onSend={this.sendHandler} />
            </div>
        );
    }
}

export default AppMain;