//example paladin data
// barbarian can be split into 3
var majorMechanicObj1 = {
  ability_name: 'Rage',
  class: 'barbarian',
  level_obtain: 1,
  effect: 'adv str-st, adv str-check, resis bludgeoning piercing slashing, ',
  action_cost: 'bonus action',
  resource_cost: '1 rage',
  resource_pool: 'by level',

  duration: '1 minute, knocked out',
  range: 'self',
  limitation: 'cannot cast, cannot concentrate',
  target_type: 'self',
  target_specific: 'none',
};

var unarmoredDefense = {
  ability_name: 'Unarmored Defense',
  type: 'passive',
  class: 'barbarian',
  level_obtain: 1,
  effect: 'AC: 10 + DEXmod + CHAmod',
  action_cost: 'n/a',
  resource_cost: 'n/a',
  duration: '1 minute',
  range: 'n/a',
  trigger: 'none',
  condition: 'no armor',
  limitation: 'none',
  target_type: 'n/a',
  target_specific: 'n/a',
  description: '',
};

var recklessAttack = {
  ability_name: 'Reckless Attack',
  type: 'ability, adjunct, trigger',
  class: 'barbarian',
  level_obtain: 2,
  effect: 'adv attackRoll-str, adv enemyattackRoll',
  action_cost: 'n/a',
  cost: 'n/a',
  duration: 'next turn',
  range: 'n/a',
  trigger: 'first attack of turn',
  condition: 'attack',
  limitation: 'none',
  target_type: 'n/a',
  target_specific: 'n/a',
  description: '',
};

var dangerSense = {
  ability_name: 'Unarmored Defense',
  type: 'passive',
  class: 'barbarian',
  level_obtain: 2,
  effect: 'adv dex-st',
  action_cost: 'n/a',
  cost: 'n/a',
  duration: '1 minute',
  range: 'n/a',
  trigger: 'none',
  condition: 'traps, spells, unvisible',
  limit_con: 'not blinded, not stealthed, not incapacitated',
  limitation: 'none',
  target_type: 'n/a',
  target_specific: 'n/a',
  description: '',
};

var extraAttack = {
  ability_name: 'Extra Attack',
  type: 'ability',
  class: 'barbarian',
  level_obtain: 5,
  effect: 'attack x 2',
  action_cost: 'action',
  resource_cost: 'n/a',
  duration: 'next turn',
  range: 'n/a',
  trigger: 'n/a',
  condition: 'n/a',
  limitation: 'none',
  target_type: 'n/a',
  target_specific: 'n/a',
  description: '',
};

var fastMovement = {
  ability_name: 'Fast Movement',
  type: 'passive',
  class: 'barbarian',
  level_obtain: 5,
  effect: 'speed +10',
  action_cost: 'n/a',
  cost: 'n/a',
  duration: 'n/a',
  range: 'n/a',
  trigger: 'none',
  condition: 'armorless',
  limit_con: 'n/a',
  limitation: 'none',
  target_type: 'n/a',
  target_specific: 'n/a',
  description: '',
};

var feralInstinct = {
  ability_name: 'feral Instinct',
  type: 'passive',
  class: 'barbarian',
  subclass: 'none',
  level_obtain: 7,
  effect: 'adv init5',
  action_cost: 'n/a',
  cost: 'n/a',
  duration: 'n/a',
  range: 'n/a',
  trigger: 'none',
  condition: 'armorless',
  limit_con: 'n/a',
  limitation: 'none',
  target_type: 'n/a',
  target_specific: 'n/a',
  description: '',
};

var retaliation = {
  ability_name: 'Retaliation',
  class: 'barbarian',
  type: 'ability, adjunct, trigger',
  subclass: 'path of the berserker',
  level_obtain: 14,
  effect: 'melee attack',
  action_cost: 'reaction',
  cost: 'none',
  duration: 'instant',
  range: 'melee',
  limitation: 'none',
  target_type: 'all',
  target_specific: 'none',
};



