import React from 'react';
// the goal is to render members of the party;
function PartyList(props) {


    let hoverClass = (props.acquiringTarget) ? 'hover' : 'nohover';

    return (<div>
      {
      props.adventurerList.map( (mem, key) => {   
      return (
           <tr className="adventurer" id={mem.name} key={key} onClick={props.getTarget}> 
            <th className={hoverClass}>
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
              {(mem.hp[0] > 0) ? null : <div className='dead'> DEAD </div>}
            </th>
            <td className={hoverClass}>
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

export default PartyList;