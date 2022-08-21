import React from 'react';
import Combat from './combat.jsx';
import PartyProfiles from './partyprofiles.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() { return ( 
    <div>
        <Combat/> 
    </div>

  ); }
}
export default App;
