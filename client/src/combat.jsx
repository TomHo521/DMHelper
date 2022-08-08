import React from 'react';

class Combat extends React.Component {
  constructor(props) {
    super(props);
    this.attack = this.attack.bind(this);
    this.state = {
    };
  }

  attack = () => {
    console.log('attacking!');
  }

  render() {
    return ( <div> <button onClick={this.attack}>Click to Attack</button> </div>
    );
  }
}

export default Combat;
