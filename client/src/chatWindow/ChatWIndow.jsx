import React from 'react';
import TabBar from './tabBar';
import CombatTab from './CombatTab';
import StatusLogTab from './StatusLogTab';

class ChatWindow extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showTabBar: false,
      activeChat: 'combatLog',
    }

    this.tabHandler = this.tabHandler.bind(this);
    this.toggleTabBar = this.toggleTabBar.bind(this);
  }

  toggleTabBar = () => {
    this.setState({showTabBar: !this.state.showTabBar});
  }

  tabHandler = (e) => {
    let tabClicked = e.target.getAttribute('name');
    this.setState({activeChat: tabClicked});
    console.log('tab clicked: ', e.target.getAttribute('name'));
  }

  render () {

    var frontTab; 
    let currentChat = (!(this.state.activeChat in this.props.privateMessage))? null : this.props.privateMessage[this.state.activeChat].log.map(element =>  
      <div name={element.name} className="tabContent">
        {element.speaker +': ' + element.msg}
      </div>);

    if (currentChat) {
      frontTab = currentChat;
    } else if (this.state.activeChat === 'statusLog') {
      frontTab = <StatusLogTab statusLog={this.props.statusLog}/>
    }
    else { //presumably === 'combatLog'
      frontTab = <CombatTab combatLog={this.props.combatLog}/>;
    }
  
    let tabBar = (!this.state.showTabBar)? null : <TabBar tabHandler={this.tabHandler} privateMessage={this.props.privateMessage}/>

    return (
      <div>
        <div className="tabBar-container">
          {tabBar}
          <div className="tabBar-plus" onClick={this.toggleTabBar}>
            {(this.state.showTabBar)? '--' : '+'}
          </div>
        </div>
        {frontTab}
      </div>
    )
  }

}

export default ChatWindow;