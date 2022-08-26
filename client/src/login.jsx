
import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      thisPlayerField: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.saveHost = this.saveHost.bind(this);
  }

  handleChange (e) {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({ [name]: value });
  }

  saveHost () {
    this.props.setTopLevelState('thisPlayer', this.state.thisPlayer);
  }

  render () {
    return (
      <div className="alignCenterLogin">
        <h2>Login</h2>
        
          <form>
            <label htmlFor="thisPlayer">Name: </label>
            <input className="login" type="text" inputMode="text" name="thisPlayerField" value={this.state.thisPlayer} onChange={this.handleChange} />
            <br></br>
            <label htmlFor="password">Password: </label>
            <input className="login" type="text" inputMode="text" name="password" value={this.state.password} onChange={this.handleChange} />
            <br></br>
            <br></br>
            <Link to="/combat" onClick={this.saveHost}>
              <input type="submit" value="Submit" />
            </Link>
          </form>
        
      </div>
    );
  }
};

export default Login;


// import React from 'react';

// class Login extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = {

//     }
//   }

//   render () {
//     return (
//     <form action="/index.html">
//       <div>Select your character:
//         <input type="radio" id="Cassian" value="Cassian"></input>
//         <input type="radio" id="Lia" value="Lia"></input>
//         <input type="radio" id="Midir" value="Midir"></input>
//         <input type="radio" id="Perg" value="Perg"></input>
//         <input type="radio" id="Po" value="Po"></input>
//         <input type="radio" id="Zovinar" value="Zovinar"></input>
//         <input type="submit" value="Submit"></input>
//       </div>
//     </form>

//   )

//   }
// }

// export default ActionMenu;