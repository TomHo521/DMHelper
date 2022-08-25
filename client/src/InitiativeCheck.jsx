import React from 'react';
import SinglePlayerInitiative from './singleplayerinitiative.jsx';

class InitiativeCheck extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
    }

    this.rollInitAndSend.bind(this);
  }

  componentDidMount(){
    socket.on('initRollDone', () => {
      this.setState({show:true});
    });
  }

  rollInitAndSend = (e) => {

    socket.emit('initRoll', {
      player: e.target.name,
      roll: Math.floor(Math.random()*20)
    });

  }

  render () {

    let doneTag = null;
    if (this.state.show) {
      doneTag = <div>all players accounted for!</div>
    } 

    let renderList = this.props.playerList.map(element =>
      <SinglePlayerInitiative player={element} rollInitAndSend={this.rollInitAndSend}/>
    );
    return (
      <div className="modal" id="initWindow">
        <div className="modal-content">
          <div className="modal-close" onClick={this.props.closeModal}>&times;</div>
          <div className='alignCenterHeader'>Combat will begin when everyone has rolled initiative!</div>
          <div className="flex-container">
             {renderList}
          </div>
          {doneTag}
        </div>
      </div> 
  )

  }
}

export default InitiativeCheck;