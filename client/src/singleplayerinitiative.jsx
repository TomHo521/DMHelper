import React from 'react';

class SinglePlayerInitiative extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }



  render () {
    let firstName = this.props.player.substring(0, 9);
    return (
      <div>
         <div>{firstName} </div>
         <div id="initRoll">0</div>
         <div> <button name={this.props.player} onClick={this.props.rollInitAndSend}>Roll Initiative </button></div>
         <div id="checkBox">❌</div>
      </div> 
  )

  }
}

export default SinglePlayerInitiative;