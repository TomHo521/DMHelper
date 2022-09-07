
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
          <div className='loginHeader'>DM Helper</div><br></br>
          <div className='loginHeader'> ver 1.0</div><br></br>
          
              <label>Login:</label>
              <input className="field_class"  name="thisPlayerField" placeholder="Login" autofocus value={this.state.thisPlayer} onChange={this.handleChange}></input> 
              <label>Password:</label>
              <input id="pass" className="field_class" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange}></input>

              <Link to="/combat" onClick={this.saveHost}>
                <button className="submit_class" type="submit" form="login_form">Submit</button>
              </Link>
        </form>
      </main>
    );
  }
};

export default Login;
