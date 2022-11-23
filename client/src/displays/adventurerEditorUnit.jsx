import React from 'react';

function AdventurerEditorUnit(props){

  let divType =  
    <div>
      {props.descriptor}:
      <input style={{width:`${props.width}em`, marginLeft:"1em"}} onChange={props.changeHandler} value={(props.keyName in props.stateObj)? props.stateObj.keyName: props.defaultValue} name={props.keyName}></input> 
    </div>;

  let spanType = 
    <span>
      {props.descriptor}:
      <input style={{width:`${props.width}em`, marginLeft:"1em", marginRight:"1em"}} onChange={props.changeHandler} value={(props.keyName in props.stateObj)? props.stateObj.keyName: props.defaultValue} name={props.keyName}></input> 
    </span>;

    return (
      (props.type === "span")? spanType : divType
    )
  };

export default AdventurerEditorUnit;