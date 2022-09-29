import React from 'react';


function TabBar(props) {

  let pmBar = Object.keys(props.privateMessage).map((objKey, index) => 
      <div name={objKey} className="tabLevel" onClick={props.tabHandler} key={index}>
        {props.privateMessage[objKey].name}
      </div>
  );

  return (
  <div className="tabBar">
    <div name="combatLog" className="tabLevel" onClick={props.tabHandler}>
    Combat Log
    </div>
    <div name="statusLog" className="tabLevel" onClick={props.tabHandler}>
      Status Log
    </div>
    {pmBar}
  </div>
);
}

export default TabBar;