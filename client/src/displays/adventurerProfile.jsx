import React from 'react';

class AdventurerProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      weapon: ['',''],
    };
    this.modifiers = this.modifiers.bind(this);
    this.proficiencyBonus = this.proficiencyBonus.bind(this);
  }

  modifiers = (stat) => {
     return Math.floor((stat - 10)/2);
  }
  proficiencyBonus = (level) => {
     return Math.floor((2 + (level - 1))/4);
  }

  componentDidMount () {
    // let weapon = this.props.AdventurerProfile.weapon;
    // this.setState({weapon: weapon});
  }


  render () {

    console.log(' AdventurerProfile: ', this.props.thisPlayerProfile);


    let {name, level, race, stats, weapon, height, weight, gold, xp, armor_class, st, skills, weaponsProf, armorProf} = this.props.thisPlayerProfile;
    
    // to avoid the class keyword
    let playerClass = this.props.thisPlayerProfile.class;

    //stat format
    let statList = (!stats)? null: Object.keys(stats).map((ele, i) => <div className="leftAlign-profile" key={i}>{ele}: {stats[ele]}</div>);
    let weaponList = (!weapon)? null: <div className="leftAlign-profile"> weapon: {weapon[0]} {weapon[1]}</div>;
    let armorList = (!armor_class)? null: <div className="leftAlign-profile">AC: {armor_class[1]} {armor_class[0]}  </div>;
    let stList = (!st)? null: Object.keys(st).map((stType, index) => <div key={index} className="leftAlign-profile">{stType}: {Object.keys(st[stType]).map(typeOfBenefit => <span> - {typeOfBenefit} </span>)} </div>);
    let skillsList = (!skills)? null: Object.keys(skills).map((skill, index) => <div key={index} className="leftAlign-profile">{skill}: {Object.keys(skills[skill]).map(typeOfBenefit => <span> - {typeOfBenefit} </span>)} </div>);

    let weaponsProfList = (!weaponsProf)? null: Object.keys(weaponsProf).map((type, index) => <div key={index} className="leftAlign-profile">- {type} </div>);
    let armorProfList = (!armorProf)? null: Object.keys(armorProf).map((type, index) => <div key={index} className="leftAlign-profile">- {type} </div>);
      

    return (
        <div className="DMCalc-modal" id="adventurerProfileWindow">
        <div className="calc-modal-content">
            <div className="close-button" onClick={this.props.closeAdventurerProfileModal}>&times;</div>
            <div className='calc-modal-header'>
              <h1>Adventurer Profile</h1>
            </div>
            <br></br>
          {/* <div className="center-container-profile"> */}

            <div className='row-container-profile'>
              <div className='leftAlign-profile'>
                {name} 
              </div>
              <div className='rightAlign-profile'>
                Level {level} {race} {playerClass}
              </div>
            </div>

            <div className='row-container-profile'>
              {statList}
            </div> 

            <div className='row-container-profile'>
              {weaponList}
              {armorList}
            </div> 

            <div className='row-container-profile'>
              <div className='leftAlign-profile'>
                height {height} weight {weight}
              </div>
            </div> 

            <div className='row-container-profile'>
              <div className='leftAlign-profile'>
                gold {gold} xp {xp}
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



           
        </div>
      </div>  
    );
  }
}

export default AdventurerProfile;