import React from 'react';
var format = require('pg-format');
import AdventurerEditorUnit from './adventurerEditorUnit';


class AdventurerEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
 
    this.generateSQL = this.generateSQL.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.resetDefaults = this.resetDefaults.bind(this);
  }

  generateSQL = () => {
    let header = "UPDATE %I SET ";

    //rotate through the state.
    let stateKeys = Object.keys(this.state);
    console.log(stateKeys);

    let sqlQueryUpdate = '';
    let sqlQueryWhere = '';

    for (var i = 0; i < stateKeys.length; i++) {

      if (typeof this.state[stateKeys[i]] !== 'object') {
        sqlQueryUpdate += ` %s = '${this.state[stateKeys[i]]}',`;
        sqlQueryWhere += ` ${stateKeys[i]},`;
      }

    }


    // let sqlQuery = format(`UPDATE %I SET %s = '${restaurant_id_api}', %s = '${restaurant_name}' \
    // WHERE (%s = '${session_id}')`, `${tableName}`, 'restaurant_id_api', 
    // 'restaurant_name', 'session_id');

    // let footer = ");";
    // let result = header + sqlQueryUpdate + 'WHERE (%s  = ' + sqlQueryWhere + footer;
    // console.log(result);
   

    //convert this state into an SQL statement.
    console.log('uploaded state: ', this.state);

    return result;
  }

  resetDefaults = () => {
    var newState = this.state;
    for (let x in newState) {
      delete newState[x];
    }
    this.setState(newState);
  }

  submitHandler = (e) => {
    this.generateSQL();
  }

  changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value});
    console.log(`${e.target.name } just edited to: ${e.target.value}`);
  }

  componentDidMount () {
  }

  render () {

    let {name, level, race, stats, weapon, height, weight, gold, xp, armor_class, st, skills, weaponsProf, armorProf} = this.props.thisPlayerProfile;
    // to avoid the class keyword
    let playerClass = this.props.thisPlayerProfile.class;


    let newStatList = (!stats)? null: Object.keys(stats).map((ele, i) => 
      <div className="leftAlign-profile" key={i}>
        <AdventurerEditorUnit type={"div"} descriptor={ele} keyName={ele} defaultValue={stats[ele]} width={2} changeHandler={this.changeHandler} stateObj={this.state}/>
      </div>
    );
    
    let weaponList = (!weapon)? null: <div className="leftAlign-profile"> 
      <AdventurerEditorUnit type={"span"} descriptor={"weapon"} keyName={"weapon"} defaultValue={weapon[0]} width={8} changeHandler={this.changeHandler} stateObj={this.state}/>
      <AdventurerEditorUnit type={"span"} descriptor={"dice"} keyName={"dice"} defaultValue={weapon[1]} width={4} changeHandler={this.changeHandler} stateObj={this.state}/>
    </div>;

    let armorList = (!armor_class)? null: <div className="leftAlign-profile">
      <AdventurerEditorUnit type={"span"} descriptor={"AC"} keyName={"AC"} defaultValue={armor_class[1]} width={8} changeHandler={this.changeHandler} stateObj={this.state}/>
      <AdventurerEditorUnit type={"span"} descriptor={"Armor"} keyName={"Armor"} defaultValue={armor_class[0]} width={4} changeHandler={this.changeHandler} stateObj={this.state}/>
      </div>;

    var typeOfBenefits = {
      proficiency: true,
      advantage: true,
      disadvantage: true,
    };
    //saving throw lists
    let stList = (!st)? null: Object.keys(st).map((stType, index) => <div key={index} className="leftAlign-profile">{stType}: {Object.keys(typeOfBenefits).map(type => 
     (type in st[stType])? <span> {type} <input style={{marginLeft:"1em"}} type="checkbox" checked={true}></input></span>: <span> {type}<input style={{marginLeft:"1em"}} type="checkbox" checked={false}></input></span>)} 
    </div>);

    //skill proficiencies, advantage, disadvantage
    let skillsList = (!skills)? null: Object.keys(skills).map((skill, index) => <div key={index} className="leftAlign-profile">{skill}: {Object.keys(skills[skill]).map(typeOfBenefit => <span> - {typeOfBenefit} </span>)} </div>);

    //weapons proficiency list
    let weaponsProfList = (!weaponsProf)? null: Object.keys(weaponsProf).map((type, index) => 
      <div key={index} className="leftAlign-profile">
        - {type} 
      </div>);

    //armor proficiency list
    let armorProfList = (!armorProf)? null: Object.keys(armorProf).map((type, index) => 
      <div key={index} className="leftAlign-profile">
        - {type} 
      </div>);

    return (
        <div className="DMCalc-modal" id="adventurerEditorWindow">
        <div className="calc-modal-content">
            <div className="close-button" onClick={this.props.closeAdventurerProfileModal}>&times;</div>
            <div className='calc-modal-header'>
              <h1>Adventurer Profile Editor</h1>
            </div>
            <br></br>

            <div className='row-container-profile'>
              <div className='leftAlign-profile'>
                <AdventurerEditorUnit type={"div"} descriptor={"name"} keyName={"name"} defaultValue={name} width={12} changeHandler={this.changeHandler} stateObj={this.state}/>
              </div>
              <div>

              </div>
              <div className='rightAlign-profile'>
              <AdventurerEditorUnit type={"span"} descriptor={"level"} keyName={"level"} defaultValue={level} width={2} changeHandler={this.changeHandler} stateObj={this.state}/>
              <AdventurerEditorUnit type={"span"} descriptor={"race"} keyName={"race"} defaultValue={race} width={9} changeHandler={this.changeHandler} stateObj={this.state}/>
              <AdventurerEditorUnit type={"span"} descriptor={"class"} keyName={"playerClass"} defaultValue={playerClass} width={9} changeHandler={this.changeHandler} stateObj={this.state}/>
              </div>
            </div>

            <div className='row-container-profile'>
              {newStatList}
            </div> 

            <div className='row-container-profile'>
              {weaponList}
              {armorList}
            </div> 

            <div className='row-container-profile'>
              <div className='leftAlign-profile'>
                <AdventurerEditorUnit type={"span"} descriptor={"height"} keyName={"height"} defaultValue={height} width={4} changeHandler={this.changeHandler} stateObj={this.state}/>
                <AdventurerEditorUnit type={"span"} descriptor={"weight"} keyName={"weight"} defaultValue={weight} width={4} changeHandler={this.changeHandler} stateObj={this.state}/>
              </div>
            </div> 

            <div className='row-container-profile'>
              <div className='leftAlign-profile'>
                <AdventurerEditorUnit type={"span"} descriptor={"gold"} keyName={"gold"} defaultValue={gold} width={4} changeHandler={this.changeHandler} stateObj={this.state}/>
                <AdventurerEditorUnit type={"span"} descriptor={"xp"} keyName={"xp"} defaultValue={xp} width={4} changeHandler={this.changeHandler} stateObj={this.state}/>
              </div>
            </div> 

            <div className='row-container-profile'>
              <div className='leftAlign-profile'>
                saving throws
                {stList}
              </div>
            </div> 

            <div className='row-container-profile'>
              <div className='leftAlign-profile'>
                Skills
                {skillsList}
              </div>
            </div> 

            <div className='row-container-profile'>
              <div className='leftAlign-profile'>
                Weapon Proficiencies
                {weaponsProfList}
              </div>
            </div> 

            <div className='row-container-profile'>
              <div className='leftAlign-profile'>
                Armor Proficiencies
                {armorProfList}
              </div>
            </div> 

            <button onClick={this.resetDefaults}> Reset Defaults</button>
            <button onClick={this.submitHandler}> Submit Changes</button>
        </div>
      </div>  
    );
  }
}

export default AdventurerEditor;