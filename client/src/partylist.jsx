import React from 'react';

// the goal is to render members of the party;
class PartyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render () {

    return (<div>
      {
      

      this.props.adventurerList.map( (mem) => {
       
        // console.log('adventurer list: ', mem.name);
      return (
           <tr className="adventurer"> 
            <th>
              <div>
                {mem.name.substring(0, 5)} init: {mem.initiative}
              </div>
              <div>
                HP:{mem.hp[0]} / {mem.hp[1]}
              </div>
              <div>
                 AC:{mem.armor_class[1]}
              </div>
              <div>
                Spell Slots
              </div>   
            </th>
            <td>
              <div>
                Lvl:{mem.level} {mem.class}
              </div>
              <div>
                {mem.weapon[0]} {mem.weapon[1]}
              </div>
              <div>
              </div>
              <div>
                  armor: {mem.armor_class[0]}
              </div>
            </td>
        </tr>)
    })}
    </div>)
  }
}
export default PartyList;