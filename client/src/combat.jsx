import React from 'react';


class Combat extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
        <div class="action-menu">
          <div class="option" onClick={this.props.attack}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Attack
          </div>
          <div class="option">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          Action
          </div>
          <div class="option">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          Bonus Action
          </div>
          <div class="option">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          Run
          </div>
        </div>
    );
  }
}

export default Combat;
