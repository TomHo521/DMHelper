import React from 'react';
// the goal is to render members of the party;
function PartyList(props) {


    let hoverClass = (props.acquiringTarget) ? 'adventurer-hover' : 'adventurer';
    let shiftClass = hoverClass + ' ' + 'shift-left';


    return (<div>
      {
      props.adventurerList.map( (mem, key) => {   
      return (
           <div className="adventurer-container" id={mem.name} key={key} onClick={props.getTarget}> 
            <div className={(mem.name === props.activeEntity) ? shiftClass: hoverClass}>
              <div className='upperleft'>
              Initiative: {(mem.initiative)? mem.initiative : 'error '}
              </div>

              <div className='parentDiv'>
                <span className="leftSide">
                  {mem.name.substring(0, 15)}  
                </span>
                <span  className="rightSide">
                   Level:{mem.level} {mem.class}
                </span>
              </div>
              {/* <div className='parentDiv'>
                Initiative: {mem.initiative}
              </div> */}
              <div className='parentDiv'>
              <span className="leftSide">
                  HP:{mem.hp[0]} / {mem.hp[1]}
                </span>
                <span  className="rightSide">
                  AC:{mem.armor_class[1]}
                </span>
              </div>
              <div>
                Spell Slots
              </div>   
              {(mem.hp[0] > 0) ? null : <div className='dead'> DEAD </div>}
            </div>

        </div>)
    })}
    </div>)
}

export default PartyList;




{/* <span>
  {mem.weapon[0]} {mem.weapon[1]}
</span>
<span>
armor: {mem.armor_class[0]}
</span>

 */}


// import React from 'react';
// // the goal is to render members of the party;
// function PartyList(props) {


//     let hoverClass = (props.acquiringTarget) ? 'hover' : 'nohover';

//     return (<div>
//       {
//       props.adventurerList.map( (mem, key) => {   
//       return (
//            <tr className="adventurer" id={mem.name} key={key} onClick={props.getTarget}> 
//             <th className={hoverClass}>
//               <div>
//                 {mem.name.substring(0, 5)} init: {mem.initiative}
//               </div>
//               <div>
//                 HP:{mem.hp[0]} / {mem.hp[1]}
//               </div>
//               <div>
//                  AC:{mem.armor_class[1]}
//               </div>
//               <div>
//                 Spell Slots
//               </div>   
//               {(mem.hp[0] > 0) ? null : <div className='dead'> DEAD </div>}
//             </th>
//             <td className={hoverClass}>
//               <div>
//                 Lvl:{mem.level} {mem.class}
//               </div>
//               <div>
//                 {mem.weapon[0]} {mem.weapon[1]}
//               </div>
//               <div>
//               </div>
//               <div>
//                   armor: {mem.armor_class[0]}
//               </div>
//             </td>
//         </tr>)
//     })}
//     </div>)
// }

// export default PartyList;