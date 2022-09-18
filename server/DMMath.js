
class DMMath {

  constructor(enemy, adventurers) {

    this.enemyObj = enemy;
    this.adventurersObj = adventurers;

    this.enemyList = [];
    this.adventurerList = [];

  }

  getIndexOf = (name, array) => {
    for (var i = 0; i < array.length; i++) {
      if (array[i].name === name) {
        return i;
      }
    }
    return -1;
  }
  
  generateIndex = (list) => {
    let indexObj = {}
    for (var i = 0; i < list.length; i++) {
      indexObj[list[i].name] = i;
    }
    return indexObj;
  }
  
  proficiencyBonus = (level) => {
    return Math.floor((2 + (level - 1))/4);
  }
  
  modifiers = (stat) => {
    return Math.floor((stat - 10)/2);
  }
  
  roll = (dice) => {
    let index = dice.indexOf('d'); 
    let qty = parseInt(dice.substring(0, index));
    let diceType = parseInt(dice.substring(index+1));
  
    var rolls = [];
    var total = 0;
  
    for (var i = 0; i < qty; i++) {
      let single = Math.floor(Math.random() * diceType) + 1;
      total += single;
      rolls.push(single);
    }
}

module.exports = DMMath;