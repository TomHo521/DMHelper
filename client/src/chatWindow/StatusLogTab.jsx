import React from 'react';

function StatusLogTab(props) {
  return (
    <div className="tabContent">
      {props.statusLog.map( (statusLogEntry, index) => {
          return (
            <div key={index}>{statusLogEntry.msg}</div>  
          )     
        })}
    </div>
  )
}

export default StatusLogTab;