import React from 'react';
import SingleTab from './SingleTab';


class TabBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.closeTab = this.closeTab.bind(this);
  }

  closeTab(e) {
    console.log('this was clicked Ct: ', e.currentTarget.getAttribute('name'));
    console.log('this was clicked tar: ', e.target.getAttribute('name'));
    this.props.deleteTab(e.currentTarget.getAttribute('name'));
  }

  render() {
    const reg = "tabLevel";
    const hi = "tabLevelSelected";
    let pmBar = Object.keys(this.props.privateMessage).map((objKey, index) => {

      let parsedKey = objKey.split('/');
      console.log('splitarray from tab: ', parsedKey);
      parsedKey = parsedKey.map(e => e.substring(0,4));
      parsedKey.join('/');

      return (this.props.privateMessage[objKey].visible === false)? null : 
      <SingleTab objKey={objKey} index={index} activeChat={this.props.activeChat} tabHandler={this.props.tabHandler} closeTab={this.closeTab}/>

  });

    return (
      <div className="tabBar">
        <div name="combatLog" className={(this.props.activeChat === 'combatLog')? hi: reg} onClick={this.props.tabHandler}>
          Combat Log
        </div>
        <div name="statusLog" className={(this.props.activeChat === 'statusLog')? hi: reg} onClick={this.props.tabHandler}>
          Status Log
        </div>
        {pmBar}
      </div>
    );
  }
}

export default TabBar;