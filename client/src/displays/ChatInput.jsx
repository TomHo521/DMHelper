import React from 'react';

class ChatInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatInput: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({ [name]: value });
  }

  handleKeyPress = (e) => {
   if (e.key === "Enter") {
      //  socket.emit('chat', `${this.props.thisPlayer}: ${this.state.chatBox}`);
      socket.emit('chat', {
        speaker: this.props.thisPlayer,
        msg: this.state.chatInput,
      });
      this.setState({chatInput: ''});
    }
  }

  render () {
    return (
      <input type="text" name="chatInput" className='chatbox' onKeyPress={this.handleKeyPress} onChange={this.handleChange} value={this.state.chatInput}></input>
    )
  }
}

export default ChatInput;