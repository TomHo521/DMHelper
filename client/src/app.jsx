import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './landingpage';
import Login from './login';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.setTopLevelState = this.setTopLevelState.bind(this);
    this.state = {
       thisPlayer: '',
       thisPlayerProfile: {}
    }
  }

  setTopLevelState (name, value) {
    this.setState({ [name]: value });
  }

  render() { return ( 
    <div>
      <Routes>
        <Route path="/combat" element={<LandingPage thisPlayer={this.state.thisPlayer} setTopLevelState={this.setTopLevelState} thisPlayerProfile={this.state.thisPlayerProfile}/>}/>
        <Route path="/" element={<Login setTopLevelState={this.setTopLevelState} />}/>
      </Routes>
    </div>); 
  }
}
export default App;
