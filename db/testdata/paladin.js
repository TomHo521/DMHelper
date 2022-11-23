//***  The purpose of this data is for purely test purposes */
//***  All stat information and db table schemas are under active change atm */

var divineSense = {
  ability_name: 'divine sense',
  class: 'paladin',
  level_obtain: 1,
  effect: 'location reveal of celestial fiend undead',
  action_cost: 'action',
  cost: '1 + CHA-mod',
  duration: 'end of next turn',
  range: '60 ft',
  limitation: 'not identity',
  target_type: 'celestial fiend undead',
  target_specific: 'none',
};

//come back to this
var layOnHands = {
  ability_name: 'lay on hands',
  class: 'paladin',
  level_obtain: 1,
  effect: 'restore hp, remove disease, remove poison',
  action_cost: 'action',
  cost: 'paladin lvl x 5',
  duration: 'instant',
  range: '60 ft',
  limitation: 'not identity',
  target_type: 'celestial fiend undead',
  target_specific: 'none',
};


// FIGHTING STYLE Enumeration

var fightingStyle = {
  ability_name: 'Fighting Style',
  class: 'paladin',
  level_obtain: 1,
  effect: 'restore hp, remove disease, remove poison',
  action_cost: 'action',
  cost: 'paladin lvl x 5',
  duration: 'instant',
  range: '60 ft',
  limitation: 'not identity',
  target_type: 'celestial fiend undead',
  target_specific: 'none',
};

var divineSmite = {
  spell_name: 'divine smite',
  class: 'paladin',
  level_obtain: 2,
  effect: 'adjunct, d8 per ss, 2d8 for first',
  action_cost: 'action',
  cost: 'ss',
  duration: 'instant',
  range: 'melee',
  limitation: 'none',
  damage_type: 'radiant',
  target_type: 'attack',
  target_specific: 'none',
};

var extraAttack = {
  spell_name: 'extra attack',
  class: 'paladin',
  level_obtain: 5,
  effect: 'extra attack',
  action_cost: 'action',
  cost: 'attack',
  duration: 'instant',
  range: 'melee',
  limitation: 'none',
  damage_type: 'attack',
  target_type: 'attack',
  target_specific: 'none',
};

var channelDivinitySW = {
  ability_name: 'Channel Divinity Sacred Weapon',
  type: 'ability',
  class: 'paladin',
  subclass: 'oath of devotion',
  level_obtain: 3,
  effect: 'attackRoll +CHAmod, weapon-becomes magical, weapon light 20ft bright, weapon light 20ft dim',
  action_cost: '1 action',
  cost: 'n/a',
  duration: '1 min',
  range: 'n/a',
  trigger: 'none',
  condition: 'armorless',
  limit_con: 'unconscious, drop weapon, end as part of action',
  limitation: 'none',
  target_type: 'n/a',
  target_specific: 'n/a',
  description: '',
} 


var channelDivinitySW = {
  ability_name: 'Channel Divinity Vow of Enmity',
  type: 'ability',
  class: 'paladin',
  subclass: 'oath of vengeance',
  level_obtain: 3,
  effect: 'adv attackRoll',
  action_cost: '1 bonus-action',
  resource_cost: 'none',
  cost: 'n/a',
  duration: '1 min',
  range: 'n/a',
  trigger: 'none',
  condition: 'armorless',
  limit_con: 'enemy dies',
  limitation: '1 per long rest, 1 per short rest',
  target_type: 'n/a',
  target_specific: 'n/a',
  description: '',
} 

//**** EXAMPLE SPELLS */

var spellObj1 = {
  spell_name: 'sanctuary',
  class: 'paladin',
  level_obtain: 3,
  nature: 'defensive',
  condition: 'targeted',
  effect: 'wisdom saving throw',
  action_cost: 'bonus action',
  cost: 'attack',
  duration: 'until target attacks, casts spell that affects enemy, deal dmg to another creature',
  range: '30ft',
  limitation: 'aoe',
  damage_type: 'none',
  target_type: 'attackee',
  target_specific: 'none',
};

var spellObj1 = {
  spell_name: 'protection from evil and good',
  class: 'paladin',
  level_obtain: 3,
  nature: 'defensive',
  condition: 'targeted',
  effect: 'wisdom saving throw',
  action_cost: 'action',
  cost: 'attack',
  duration: '10 min,concentration',
  range: 'touch',
  limitation: 'aoe',
  damage_type: 'attack',
  target_type: 'attack',
  target_specific: 'none',
  select: 'choice 1 choice 2 choice3',
};

//we can see a possibility where a spell causes the selection of a second window.








//passive effects defense, dueling, great weapon fighting, protection---these are not spells
//but passive effects

//example passives are Fighting Style
//Divine health-- immune to disease
//aura of protection
//

//path
//sacred oath
//channel divinity




