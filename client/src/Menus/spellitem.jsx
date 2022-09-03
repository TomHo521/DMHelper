import React from 'react';


class SpellItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }

  }

  componentDidMount(){
    console.log('single item being called');
    

    };
  render () {
    
  return (
     
          <tr className="magic-modal-spellList">
            
            <th className="spell-header">
              {this.props.spell.name}
            </th>
            <td className="magic-td">
            <div id="magic-div">
                level {this.props.spell.level[0]} {this.props.spell.level[1]}
              <br></br>
              <br></br>
                effect: {this.props.spell.description}
            </div>
            </td>
          </tr>         
    
  )

  }
}
export default SpellItem;

