import React from 'react';

function SpellItem(props) {
  return (
          <tr name={props.spell.name} className="magic-modal-spellList" onClick={props.spellClickHandler}>
            <th className="spell-header">
              {props.spell.name}
            </th>
            <td className="magic-td">
            <div id="magic-div">
                Level {props.spell.level[0]} {props.spell.level[1]}
              <br></br>
              <br></br>
                effect: {props.spell.description}
            </div>
            </td>
          </tr>         
  )
}

export default SpellItem;

