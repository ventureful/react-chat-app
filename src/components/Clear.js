import React, { Component } from 'react';
import '../styles/ChatApp.css';

class Clear extends Component {
    render() {
        return (
            <p className='clear' onClick={this.props.clearMessages}>Clear Messages</p>
        );
    }
}

export default Clear;