import React from 'react';
import SubActionMenu from './Menus/subActionMenu';
import BonusActionMenu from './Menus/bonusAction';



class Combat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySubActions: false,
      displayBonusActions: false,
    }
    this.actionClickHandler = this.actionClickHandler.bind(this);
    this.bonusActionClickHandler = this.bonusActionClickHandler.bind(this);
  }

  actionClickHandler = (e) => {
    this.setState({displaySubActions: !this.state.displaySubActions});
  }

  bonusActionClickHandler = (e) => {
    this.setState({displayBonusActions: !this.state.displayBonusActions});
  }

  render() {
    let subActionMenu = (this.state.displaySubActions) ? <SubActionMenu openMagicModal={this.props.openMagicModal}/> : null;
    let bonusActionMenu = (this.state.displayBonusActions) ? <BonusActionMenu openBonusModal={this.props.openBonusModal}/> : null;

    return (
        <div class="action-menu">
          <div class="option" onClick={this.props.attack}>
            <span></span><span></span><span></span><span></span>
            Attack
          </div>
          <div class="option" onClick={this.actionClickHandler}>
            <span></span><span></span><span></span><span></span>
          Action
          </div>
          {subActionMenu} 
          <div class="option" onClick={this.bonusActionClickHandler}>
            <span></span><span></span><span></span><span></span>
          Bonus Action
          </div>
          {bonusActionMenu} 
          <div class="option">
            <span></span><span></span><span></span><span></span>
          Run
          </div>
        </div>
    );
  }
}

export default Combat;
