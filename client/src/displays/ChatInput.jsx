import React from 'react';

class ChatInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatInput: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.processInput = this.processInput.bind(this);
  }

  handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({ [name]: value });
  }

  processInput = () => {

    let message = {
      speaker: this.props.thisPlayer, 
      recipients:{}, 
      msg: this.state.chatInput, 
      roomID: this.props.activeChat,
      name: this.props.activeChat,
      type: 'chat',
    };
    
    let array = this.state.chatInput.split(' ');
    if (array[0] === '/w') {
      message.type = 'pm';
      array.shift();

      //ascertain the quotes
      var i = 0;
    
      for (var i = 0; i < array.length; i++) {
        if ((array[i][0] === '"') || (array[i][0] === "'")) {
            let j = 0;
            while ((array[i+j][array[i+j].length-1] !== '"') && (array[i+j][array[i+j].length-1] !== "'") && (i + j < array.length)) {
              j++;
            }
            if (i + j < array.length) {  
              array[i] = array[i].substring(1);
              array[i+j] = array[i+j].substring(0, array[i+j].length-1);
              let name = array.slice(i,i+j+1).join(' ');
              console.log('resulting name: ', name);
              console.log('array before splice: ', array);
              console.log('this is j: ', j);
              console.log('i: ', array[i]);
              console.log(' i+j-1', array[i + j -1 ]);
              console.log(' i+j ', array[i + j]);
              console.log(' i+j+1', array[i + j + 1]);
              array.splice(i, j + 1, name);

              console.log('array after splice: ', array);
              i += j;
            } else {
              break;
            }
        }
      }

      console.log('parsed array: ', array);
      i = 0;

      console.log('before: ', Object.keys(this.props.currentlyOnline));

      while ((array[i] in this.props.currentlyOnline) && (i < array.length)) {
        i++;
      }

      console.log('i counter ended at: ', i);

      //the rest of the string is the message.
      message.msg = array.slice(i).join(' ');
      //*Try something adding speaker to recipients, since we need to send anyway
      let recipientArray = array.slice(0,i);
      recipientArray.push(message.speaker);
      recipientArray.sort();
      recipientArray.forEach(ele => message.recipients[ele] = ele);

      //sort the recipient array into alphabetical order to create roomID
      message.roomID = recipientArray.join('/');
      message.name = message.roomID;

      Object.keys(message.recipients).forEach(e => console.log('name: ', message.recipients[e]));
      console.log('final message: ', message.msg);
      console.log('proposed roomID: ', message.roomID);
    }

    if ((message.roomID !== 'combatLog') || (message.roomID !== 'statusLog')) {
      message.type = 'pm';
      console.log('converted type from chat to pm: ', message.roomID);
    }

    return message;
     
  }

  handleKeyPress = (e) => {
   if (e.key === "Enter") {
      // socket.emit('chat', {
      //   speaker: this.props.thisPlayer,
      //   msg: this.state.chatInput,
      // });
      socket.emit('chat', this.processInput());
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