import React from 'react';
import SubActionMenu from './Menus/subActionMenu';



class Combat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displaySubActions: false,
    }

    this.actionClickHandler = this.actionClickHandler.bind(this);
  }

  actionClickHandler = (e) => {
    this.setState({displaySubActions: !this.state.displaySubActions});
  }

  componentDidMount() {
  }

  render() {
    let subActionMenu = (this.state.displaySubActions) ? <SubActionMenu openMagicModal={this.props.openMagicModal}/> : null;

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
          <div class="option">
            <span></span><span></span><span></span><span></span>
          Bonus Action
          </div>
          <div class="option">
            <span></span><span></span><span></span><span></span>
          Run
          </div>
        </div>
    );
  }
}

export default Combat;
