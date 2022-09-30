import React from 'react';

function SingleTab(props) {

  const reg = "tabLevel";
  const hi = "tabLevelSelected";

  return (
    <div name={props.objKey} className={(props.objKey === props.activeChat)? hi: reg} onClick={props.tabHandler} key={props.index}>
      <div name={props.objKey} className="tabContainer">
        <div name={props.objKey} className="tabLeftSide">
          {props.objKey.substring(0, 11)}
        </div>
        <div name={props.objKey} className="tabRightSide" onClick={props.closeTab}>
          x
        </div>
      </div>
  </div>

  );

}

export default SingleTab;