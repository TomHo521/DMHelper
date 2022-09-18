import React from 'react';

class SinglePlayerInitiative extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }
  
  render () {

    var status = false;

    if ((this.props.player.roll === 0) || (this.props.player.roll === 'N/A') || (!this.props.player.roll)) {
      status = '❌';
    } else {
      status ='✅';
    }
    
    let firstName = this.props.player.name.substring(0, 9);
    let roll = (this.props.player.roll)? this.props.player.roll : 0;
    return (
      <div className="initRollTile">
         <div className="nameColor">{firstName} </div>
         <div id="initRoll">{roll}</div>
         <div className="initRoll-button" name={this.props.player.name} onClick={this.props.rollInitAndSend}>Roll Initiative</div>
         <div id="checkBox">{status}</div>
      </div> 
  )
  }
}

export default SinglePlayerInitiative;