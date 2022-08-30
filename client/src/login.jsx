
import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      thisPlayerField: '',
      password: '',
      player:'',
      checked: false,
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
    this.props.setTopLevelState('thisPlayer', this.state.thisPlayerField);
  }

  render () {
    return (


      <main>
        
        <form id="login_form" className="form_class" action="login/login-access.php" method="post">
          <div className='loginHeader'>DM Helper</div>
          <br></br>
          <div className='loginHeader'> ver 1.0</div>
          <br></br>
          
              <label>Login:</label>
              <input className="field_class"  name="thisPlayerField" placeholder="Login" autofocus value={this.state.thisPlayer} onChange={this.handleChange}></input> 
              <label>Password:</label>
              <input id="pass" className="field_class" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange}></input>

              <Link to="/combat" onClick={this.saveHost}>
                <button className="submit_class" type="submit" form="login_form" onclick="return validarLogin()">Submit</button>
              </Link>
        </form>
      </main>

      
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




/* <div className='alignCenterLogin'>
        <div className='loginOutside'>
          <h2>Login</h2>
            <form>
              <label htmlFor="thisPlayer">Name: </label>
              <br></br>
              <input className="login" type="text" inputMode="text" name="thisPlayerField" value={this.state.thisPlayer} onChange={this.handleChange} />
              <br></br>
              <label htmlFor="password">Password: </label>
              <br></br>
              <input className="login" type="text" inputMode="text" name="password" value={this.state.password} onChange={this.handleChange} />
              <br></br>
              <br></br>
              <Link to="/combat" onClick={this.saveHost}>
                <input type="submit" value="Submit" />>
              </Link>
            </form>
        </div>
      </div> */

      /*


      <div className="form_div">
              <label>Login:</label>
              <br></br>
              <br></br>
              <div className='radio-div'>
               
                <label>
                  <input className="inputRadio" type="radio" name="player" value="Cassian" checked={this.state.checked} onClick={this.handleRadioCheck}></input>
                  Cassian
                </label>
                <br></br>
                <label>
                  <input className="inputRadio" type="radio" name="player" value="Lia" checked={this.state.checked} onClick={this.handleRadioCheck}></input>
                  Lia
                </label>
                <br></br>
                
                <label>
                  <input className="inputRadio" type="radio" name="player" value="Midir" checked={this.state.checked} onClick={this.handleRadioCheck}></input>
                  Midir
                </label>
                <br></br>
                
                <label>
                  <input className="inputRadio" type="radio" name="player" value="Pergilius von Waxilium" checked={this.state.checked} onClick={this.handleRadioCheck}></input>
                  Pergilius von Waxilium
                </label>
                <br></br>
                
                <label>
                  <input className="inputRadio" type="radio" name="player" value="Po" checked={this.state.checked} onClick={this.handleRadioCheck}></input>
                  Po
                </label>
                <br></br>
                
                <label>
                  <input className="inputRadio" type="radio" name="player" value="Zovinar" checked={this.state.checked} onClick={this.handleRadioCheck}></input>
                  Zovinar
                </label>
                <br></br>
                
              </div>
              <br></br>
              <br></br>

              </div>

              */