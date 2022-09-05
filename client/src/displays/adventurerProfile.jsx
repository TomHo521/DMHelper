import React from 'react';

function AdventurerProfile(props){
  return (
    <div className="adventurer-modal" id="adventurerProfileWindow">
      <div className="magic-modal-content">
          <div className="magic-modal-close" onClick={props.closeAdventurerProfileModal}>&times;</div>
          <br></br>
          <h3 className="spellBanner" onClick={props.closeMagicModal}>Adventurer Profile Modal</h3><br></br>   
        <div className="adventurer-modal-div">
        <table>
            <tbody>
              <tr>
                  name: {props.thisPlayerProfile.name}
                  <br></br>
                  class: {props.thisPlayerProfile.class}
                  <br></br>
                  race: {props.thisPlayerProfile.race}
                  <br></br>
              </tr>
              <tr>
                <th>Level: </th>
                <td>
                {props.thisPlayerProfile.level}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div> 
  )
}
export default AdventurerProfile;

