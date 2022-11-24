import React from 'react'
import ChecklistItem from './checklistItem'

function ChecklistFieldSet(props) {

  let checklist = props.input.map( ele => 
    <ChecklistItem afterText={ele.name} checked={ele.checked}/>
  );

  return (
    <fieldset>
      <legend>
        legendary items only
      </legend>
      {checklist}
    </fieldset>
  )
}

export default ChecklistFieldSet;