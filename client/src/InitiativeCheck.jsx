import React from 'react';
import SinglePlayerInitiative from './singleplayerinitiative.jsx';

class InitiativeCheck extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      playerList: {
                   'Midir': 0, 
                   'Lia': 0, 
                   'Pergilius von Waxilium' :0, 
                   'Zovinar': 0, 
                   'Cassian': 0,
                   'Po': 0,
                  },
    }

    this.rollInitAndSend.bind(this);
  }

  componentDidMount(){
    socket.on('initRollDone', () => {
      this.setState({show:true});
    });

    socket.on('rollReceived', (message) => {
      let playerList = this.state.playerList;

      console.log(`message.name ${message.name }, message.roll ${message.roll}`);

      if (message.name in playerList){
        if (playerList[message.name] === 0) {
          playerList[message.name] = message.roll;
          this.setState({playerList});
        }
      }

    });
  }

  rollInitAndSend = (e) => {
    socket.emit('initRoll', {
      name: e.target.name,
      roll: Math.floor(Math.random()*20) + 1,
    });
  }

  render () {

    let doneTag = null;
    if (this.state.show) {
      doneTag = <div class="alignCenterHeader">all players accounted for!</div>
    } 

    let renderList = Object.keys(this.state.playerList).map(element => 
      <SinglePlayerInitiative player={{name: element, roll: this.state.playerList[element]}} rollInitAndSend={this.rollInitAndSend}/>
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