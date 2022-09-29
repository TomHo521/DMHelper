
export class Adventurer {

  constructor() {

  //should have all the player state information, which could be instantiated
  //from an object?

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
    return {
      total: total,
      rolls: rolls,
    }
  }
}


export function roll(dice) {
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
  return {
    total: total,
    rolls: rolls,
  }
}

