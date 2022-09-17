var spellList_Server = {
  'Armor of Agathys': {
    level: [1, 'abjuration'],
    name: 'Armor of Agathys',
    attackType: 'defensive',
    effect: {
      heal: 0,
      temp_hp: [5, 'per SS'],
    },
    castingTime: `1 action`,
  },
  Firebolt : {
    level: [0, 'cantrip'],
    attackType: 'ranged spell attack',
    name: 'Firebolt',
    castingTime: '1 action',
    range: 120,
    effect: {
      dmg: [[4, '1d10'], [10, '2d10'], [16, '3d10'], [20, '4d10']],
    },
    description: 'mote of fire',
    sideEffects: 'flammable objects ignite',
  },
 'Eldritch Blast' : {
    level: [0, 'cantrip'],
    attackType: 'ranged spell attack',
    name: 'Eldritch Blast',
    castingTime: '1 action',
    range: 120,
    effect: {
      dmg: [[4, '1d10', 1], [10, '1d10', 2], [16, '1d10', 3], [20, '1d10', 4]],
    },
    description: 'mote of fire',
    sideEffects: 'tbd'
  },
  'Sacred Flame': {
    level: [0, 'cantrip'],
    attackType: 'ranged spell attack',
    name: 'Sacred Flame',
    castingTime: '1 action',
    range: 60,
    effect: {
      dmg: [[4, '1d8', 1], [10, '2d8', 2], [16, '3d8', 3], [20, '4d8', 4]],
      saving_throw:['dex', 'no benefit']   
    },
    description: 'flame like radiance descends upon creature',
    side_effects: 'tbd',
  },

  Fireball: {
    level: [3, 'evocation'],
    attackType: '20ft radius',
    name: 'Fireball',
    castingTime: '1 action',
    range: 150,
    effect: {
      dmg: ['8d6'],
      SS: ['1d6', 'per SS'],
      saving_throw:['dex'],
    },
    description: 'bright streak from fingers to low roar into an explosion of flame',
    side_effects: 'tbd',
  },

  Thunderstrike: {
    level: [3, 'evocation'],
    attackType: '20ft radius',
    name: 'Thunderstrike',
    castingTime: '1 action',
    range: 150,
    effect: {
      dmg: ['8d6'],
      SS: ['1d6', 'per SS'],
      saving_throw:['dex'],
    },
    description: 'tbe',
    side_effects: 'tbd',
  }

}

module.exports = spellList_Server;
