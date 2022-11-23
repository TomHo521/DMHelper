import React from 'react';
import TabBar from './tabBar';
import CombatTab from './CombatTab';
import StatusLogTab from './StatusLogTab';

class ChatWindow extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showTabBar: false,
      //activeChat: 'combatLog',
    }

    //this.tabHandler = this.tabHandler.bind(this);
    this.toggleTabBar = this.toggleTabBar.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  toggleTabBar = () => {
    this.setState({showTabBar: !this.state.showTabBar});
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({behavor: "smooth"});
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render () {

    var frontTab; 
    let currentChat = (!(this.props.activeChat in this.props.privateMessage))? null : this.props.privateMessage[this.props.activeChat].log.map(element =>  
      <div name={element.name} className="tabContent">
        {element.speaker + '(pm): ' + element.msg}
      </div>);

    if (currentChat) {
      frontTab = currentChat;
    } else if (this.props.activeChat === 'statusLog') {
      frontTab = <StatusLogTab statusLog={this.props.statusLog}/>
    }
    else { //presumably === 'combatLog'
      frontTab = <CombatTab combatLog={this.props.combatLog}/>;
    }
  
    let tabBar = (!this.state.showTabBar)? null : <TabBar activeChat={this.props.activeChat} tabHandler={this.props.setActiveChat} privateMessage={this.props.privateMessage} closeTab={this.props.closeTab} deleteTab={this.props.deleteTab}/>


    return (
      <div>
        <div className="tabBar-container">
          {tabBar}
          <div className="tabBar-plus" onClick={this.toggleTabBar}>
            {(this.state.showTabBar)? '--' : '+'}
          </div>
        </div>
        {frontTab}
        <div style={{float: "left", clear:"both"}} ref={(el) => {this.messagesEnd = el;}}></div>
      </div>
    )
  }

}

export default ChatWindow;