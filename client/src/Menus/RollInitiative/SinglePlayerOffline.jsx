import React from 'react';

function SinglePlayerOffline(props){  
  let firstName = props.player.name.substring(0, 9);

    return (
      <div className='initRollAbsent'>
         <div className="nameColor">{firstName} </div>
         <div></div>
         <div></div>
         <div>Offline</div>
      </div> 
  )
}

export default SinglePlayerOffline