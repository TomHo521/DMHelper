import React from 'react';


function SkillItem(props) {

  var className = 'dd-unselected';

  if (props.selected === props.skill) {
    className = 'dd-selected';
  }

  var skillString = props.skill + ' ';

  if (props.player) {

    if (props.player.skills) {
      
      if (props.player.skills[props.skill]) {
        skillString += '(';

        if (props.player.skills[props.skill].proficiency) {
          skillString += 'P';
        }
        if (props.player.skills[props.skill].advantage) {
          skillString += 'A';
        }

        if (props.player.skills[props.skill].expertise) {
          skillString += 'e';
        }

        if (props.player.skills[props.skill].conditional) {
          skillString += 'c';
        }

        skillString += ')';
      }

     
    }

  }


  return (
    <dd className={className} onClick={props.clickHandler} name={props.skill}> {skillString}</dd>
  );

}

export default SkillItem;
