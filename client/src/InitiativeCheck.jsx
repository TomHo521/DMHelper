import React from 'react';
import SinglePlayerInitiative from './singleplayerinitiative.jsx';

class InitiativeCheck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    }
    this.rollInitAndSend = this.rollInitAndSend.bind(this);
  }

  componentDidMount(){
    socket.on('initRollDone', () => {
      this.setState({show:true});
    });
    socket.on('rollReceived', (message) => {
      this.props.updateUI();
    });
  }

  rollInitAndSend = (e) => {
    socket.emit('initRoll', {
      name: e.currentTarget.getAttribute('name'),
      roll: Math.floor(Math.random()*20) + 1,
    });
  }

  render () {
    let doneTag = (this.state.show)? <div class="alignCenterHeader">all players accounted for!</div> : null;
  
    let renderList = Object.keys(this.props.initiativeList).sort().map(element => 
      <SinglePlayerInitiative player={{name: element, roll: this.props.initiativeList[element]}} rollInitAndSend={this.rollInitAndSend}/>
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
      </div> )
  }
}

export default InitiativeCheck;
