import React from 'react';
import TabBar from './tabBar';
import CombatLogEntry from '../CombatLogEntry';

class ChatWindow extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showTabBar: false,
      activeChat: 'tb3',
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
    let currentChat = (!(this.state.activeChat in this.props.privateMessage))? null : this.props.privateMessage[this.state.activeChat].log.map(element =>  
      <div name={element.name} className="tabContent">
        {element.speaker +': ' + element.msg}
      </div>);

    let tabBar = (!this.state.showTabBar)? null : <TabBar tabHandler={this.tabHandler}/>

    return (
      <div>
        <div className="tabBar-container">
          {tabBar}
          <div className="tabBar-plus" onClick={this.toggleTabBar}>
            {(this.state.showTabBar)? '--' : '+'}
          </div>

        </div>

        <div id="tc1" className="tabContent">
          {this.props.combatLog.map( (combatLogEntry, index) => {
              return (
                <CombatLogEntry key={index} message={combatLogEntry.msg}/>)          
            })}
        </div>
        {currentChat}
      </div>
    )
  }

}

export default ChatWindow;