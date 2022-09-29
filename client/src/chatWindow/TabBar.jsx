import React from 'react';


function TabBar(props) {

  return (
  <div className="tabBar">
    <div name="tb1" className="tabLevel" onClick={props.tabHandler}>
    Combat Window
    </div>
    <div name="tb2" className="tabLevel" onClick={props.tabHandler}>
      Lia/Perg
    </div>
    <div name="tb3" className="tabLevel" onClick={props.tabHandler}>
      Cassian-Po
    </div>
    <div name="tb4" className="tabLevel" onClick={props.tabHandler}>
      Midir-Zovinar-Lia
    </div>
    <div name="tb5" className="tabLevel" onClick={props.tabHandler}>
      tab 5
    </div>
  </div>
);
}

export default TabBar;