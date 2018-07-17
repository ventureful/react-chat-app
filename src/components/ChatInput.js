import React, { Component } from 'react';

class ChatInput extends Component {
    constructor(props){
        super(props);
        this.state = { chatInput: ''};
        this.submitHandler = this.submitHandler.bind(this);
        this.textChangeHandler = this.textChangeHandler.bind(this);
    }

    textChangeHandler(event){
        this.setState({ chatInput: event.target.value })
    }

    submitHandler(event){
        event.preventDefault();
        this.props.onSend(this.state.chatInput);
        this.setState({ chatInput: ''});
    }

    componentDidMount() {
        this.messageInput.focus();
    }

    render() {
        return (
            <form className="chat-input" onSubmit={this.submitHandler}>
                <input
                    type="text"
                    onChange={this.textChangeHandler}
                    value={this.state.chatInput}
                    placeholder="Type here..."
                    required
                    ref={(input)=>{this.messageInput = input; }}
                />
            </form>
        );
    }
}

export default ChatInput;