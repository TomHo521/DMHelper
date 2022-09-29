import React from 'react';
import CombatLogEntry from './CombatLogEntry';

function CombatTab(props) {
  return (
    <div id="tc1" className="tabContent">
      {props.combatLog.map( (combatLogEntry, index) => {
          return (
            <CombatLogEntry key={index} message={combatLogEntry.msg}/>)          
        })}
    </div>
  )
}

export default CombatTab;