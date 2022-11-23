import React from 'react';

//gets passed a single variable.
function AdventureUnit(props) {

  return (
    <div>
      {props.name} {props.value}
    </div>

  );

}

export default AdventureUnit