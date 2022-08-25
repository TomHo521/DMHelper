import React from 'react';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render () {
    return (
    <form action="/index.html">
      <div>Select your character:
        <input type="radio" id="Cassian" value="Cassian"></input>
        <input type="radio" id="Lia" value="Lia"></input>
        <input type="radio" id="Midir" value="Midir"></input>
        <input type="radio" id="Perg" value="Perg"></input>
        <input type="radio" id="Po" value="Po"></input>
        <input type="radio" id="Zovinar" value="Zovinar"></input>
        <input type="submit" value="Submit"></input>
      </div>
    </form>

  )

  }
}

export default ActionMenu;