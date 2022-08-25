import React from 'react';

class SinglePlayerInitiative extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }
  


  componentDidMount () {

  }


  render () {

    var status = false;

    if (this.props.player.roll === 0) {
      status = '❌';
    } else {
      status ='✅';
    }

    console.log('singleplayerinitiative: ', this.props.player.name);
    
    let firstName = this.props.player.name.substring(0, 9);
    return (
      <div>
         <div>{firstName} </div>
         <div id="initRoll">{this.props.player.roll}</div>
         <div> <button name={this.props.player.name} onClick={this.props.rollInitAndSend}>Roll Initiative </button></div>
         <div id="checkBox">{status}</div>
      </div> 
  )

  }
}

export default SinglePlayerInitiative;