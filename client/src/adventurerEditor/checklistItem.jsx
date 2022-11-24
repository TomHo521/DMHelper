import React from 'react'
import { useState } from 'react'

function ChecklistItem(props) {

  const [checked, setCheck] = useState(props.checked || false);

  const checkHandler = () => {
    setCheck(!checked);
  }

  return (
    <div>
      <label>
          {props.beforeText}
          <input type="checkbox" checked={checked} onClick={checkHandler}/>
          {props.afterText}
      </label>
    </div>
  )
}

export default ChecklistItem;