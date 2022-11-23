var player1 = {
  name : 'Pergilius Von Waxilium',
  hp : [45, 55],
  ss : [[2,2], [0, 1]],
  weapon : ['spear','1d8'],
  armor_class: ['chain mail', 15],
  speed: 30,
  tagline: "Here to kick ass and check gum...and I'm all outta gum!",
  level: 3,
  class: 'bard',
  race: 'human',
  height: '5ft8',
  weight: '160lbs',
  gold: 15,
  xp: 454,
  location: {
    Waxilium: 'Dread Dragonhide Saloon',
  },
  spellModifier: 'cha',
  class_traits: {
    activeSpells: {
      thunderstrike: 3,
    },
    bardic_inspiration: '1d6',
    jack_of_all_trades: 'add half prof bonus rounded down',
    abi: 'brawler',
    college_of_lore: {
      cutting_words: 3,
    },
  },
  stats : {
    str: 15,
    int: 15,
    cha: 15,
    dex: 15,
    wis: 15,
    con: 15,
  },
  equipped: {
    weapon: 'spear',
    weaponStat: '1d6',
    armor: 'chain mail',
    armorStat: '15',
  },
  inventory : {
    'sandwich' : 1,
    'rapier': 1,
  },
  st: {
    str: {
    },
    con: {
    },
    dex: {
      proficiency: 'bard class',
    },
    cha: {
      proficiency: 'bard class',
      advantage: 'gnome cunning racial',
    },
    int: {
      advantage: 'gnome cunning racial',
    },
    wis: {
      advantage: 'gnome cunning racial',
    },
  },
  skills: {
    qualifiers: {
      'jack of all trades': 'bard class level 3',
    },
    performance: {
      proficiency: 'bard class',
      expertise: 'bard class level 3',
    },
    history: {
      proficiency: 'bard class',
      expertise: 'bard class level 3',
      conditional: {
        double_prof: "artificer's lore",
        qualifier: ['magical items', 'alchemical objects', 'technological devices'],
      },
    },
    investigation: {
      proficiency: 'bard class',
    },
    stealth: {
      proficiency: 'criminal background',
    },
    deception: {
      proficiency: 'criminal background',
    },
  },
  attack:{
    archery: 'weapon style',
  },
  weaponsProf: {
    simple: 'tbd',
    'hand crossbow': '1d6',
    'long sword': '1d8',
    'rapier': '1d8',
  },
  armorProf: {
    'light armor': 14,
  },
  restlevel: 0,
  position: [0, 0, 0],
}


var player2 = {
  name : 'Po',
  hp : [45, 55],
  ss : [],
  weapon : ['fists of fury','1d6'],
  armor_class: ['leather', 15],
  speed: 30,
  tagline: "Nothing can stand before my Fists of Fury!",
  level: 3,
  class: 'monk',
  race: 'human',
  height: '5ft10',
  weight: '250lbs',
  gold: 6,
  xp: 454,
  location: {
    Waxilium: 'Dread Dragonhide Saloon',
  },
  spellModifier: 'none',
  class_traits: {
    activeSpells: {
    },
  },
  stats : {
    str: 15,
    int: 15,
    cha: 15,
    dex: 15,
    wis: 15,
    con: 15,
  },
  equipped: {
  },
  inventory : {
    'jug of fire wine' : 1,
  },
  st: {
    str: {
    },
    con: {
    },
    dex: {
      proficiency: 'bard class',
    },
    cha: {
      proficiency: 'bard class',
      advantage: 'gnome cunning racial',
    },
    int: {
      advantage: 'gnome cunning racial',
    },
    wis: {
      advantage: 'gnome cunning racial',
    },
  },
  skills: {
    qualifiers: {
      'jack of all trades': 'bard class level 3',
    },
    performance: {
      proficiency: 'bard class',
      expertise: 'bard class level 3',
    },
    history: {
      proficiency: 'bard class',
      expertise: 'bard class level 3',
      conditional: {
        double_prof: "artificer's lore",
        qualifier: ['magical items', 'alchemical objects', 'technological devices'],
      },
    },
    investigation: {
      proficiency: 'bard class',
    },
    stealth: {
      proficiency: 'criminal background',
    },
    deception: {
      proficiency: 'criminal background',
    },
  },
  attack:{
    archery: 'weapon style',
  },
  weaponsProf: {
    simple: 'tbd',
    'hand crossbow': '1d6',
    'long sword': '1d8',
    'rapier': '1d8',
  },
  armorProf: {
    'light armor': 14,
  },
  restlevel: 0,
  position: [0, 0, 0],
}

var player3 = {
  name : 'Lia',
  hp : [45, 55],
  ss : [[1,1]],
  weapon : ['Longsword','1d8'],
  armor_class: ['leather', 15],
  speed:30,
  tagline: "Cut it outttttt!!!",
  level: 3,
  class: 'fighter',
  race: 'sun elf',
  height: '5ft7',
  weight: '130lbs',
  gold: 5,
  xp: 454,
  location: {
    Waxilium: 'Dread Dragonhide Saloon',
  },
  spellModifier: 'int',
  class_traits: {
    activeSpells: {
    },
  },
  stats : {
    str: 15,
    int: 15,
    cha: 15,
    dex: 15,
    wis: 15,
    con: 15,
  },
  equipped: {

  },
  inventory : {
    'celestial locket' : 1,
  },
  st: {
    str: {

    },
    con: {

    },
    dex: {
      proficiency: 'bard class',
    },
    cha: {
      proficiency: 'bard class',
      advantage: 'gnome cunning racial',
    },
    int: {
      advantage: 'gnome cunning racial',
    },
    wis: {
      advantage: 'gnome cunning racial',
    },
  },
  skills: {
    qualifiers: {
      'jack of all trades': 'bard class level 3',
    },
    performance: {
      proficiency: 'bard class',
      expertise: 'bard class level 3',
    },
    history: {
      proficiency: 'bard class',
      expertise: 'bard class level 3',
      conditional: {
        double_prof: "artificer's lore",
        qualifier: ['magical items', 'alchemical objects', 'technological devices'],
      },
    },
    investigation: {
      proficiency: 'bard class',
    },
    stealth: {
      proficiency: 'criminal background',
    },
    deception: {
      proficiency: 'criminal background',
    },
  },
  attack:{
    archery: 'weapon style',
  },
  weaponsProf: {
    simple: 'tbd',
    'hand crossbow': '1d6',
    'long sword': '1d8',
    'rapier': '1d8',
  },
  armorProf: {
    'light armor': 14,
  },
  restlevel: 0,
  position: [0, 0, 0],
}

var player4 = {
  name : 'Cassian',
  hp : [45, 55],
  ss : [],
  weapon : ['Knifes','1d6'],
  armor_class: ['leather', 15],
  speed: 30,
  tagline: "that kid was stronger than he looked!",
  level: 3,
  class: 'rogue',
  race: 'dark elf',
  height: '5ft8',
  weight: '160lbs',
  gold: 5,
  xp: 454,
  location: {
    Waxilium: 'Dread Dragonhide Saloon',
  },
  spellModifier: 'int',
  class_traits: {
    activeSpells: {
    },
  },
  stats : {
    str: 15,
    int: 15,
    cha: 15,
    dex: 15,
    wis: 15,
    con: 15,
  },
  equipped: {

  },
  inventory : {
    'bag of tricks' : 1,
  },
  st: {
    str: {
    },
    con: {
    },
    dex: {
      proficiency: 'bard class',
    },
    cha: {
      proficiency: 'bard class',
      advantage: 'gnome cunning racial',
    },
    int: {
      advantage: 'gnome cunning racial',
    },
    wis: {
      advantage: 'gnome cunning racial',
    },
  },
  skills: {
    qualifiers: {
      'jack of all trades': 'bard class level 3',
    },
    performance: {
      proficiency: 'bard class',
      expertise: 'bard class level 3',
    },
    history: {
      proficiency: 'bard class',
      expertise: 'bard class level 3',
      conditional: {
        double_prof: "artificer's lore",
        qualifier: ['magical items', 'alchemical objects', 'technological devices'],
      },
    },
    investigation: {
      proficiency: 'bard class',
    },
    stealth: {
      proficiency: 'criminal background',
    },
    deception: {
      proficiency: 'criminal background',
    },

  },
  attack:{
    archery: 'weapon style',
  },
  weaponsProf: {
    simple: 'tbd',
    'hand crossbow': '1d6',
    'long sword': '1d8',
    'rapier': '1d8',
  },
  armorProf: {
    'light armor': 14,

  },
  restlevel: 0,
  position: [0, 0, 0],
}

var player5 = {
  name : 'Zovinar',
  hp : [45, 55],
  ss : [],
  weapon : ['rapier','1d8'],
  armor_class: ['leather', 15],
  speed: 30,
  tagline: "let me handle this one guys!",
  level: 3,
  class: 'fighter',
  race: 'human',
  height: '5ft8',
  weight: '160lbs',
  gold: 5,
  xp: 454,
  location: {
    Waxilium: 'Dread Dragonhide Saloon',
  },
  spellModifier: 'none',
  class_traits: {
    activeSpells: {
    },
  },
  stats : {
    str: 15,
    int: 15,
    cha: 15,
    dex: 15,
    wis: 15,
    con: 15,
  },
  equipped: {
  },
  inventory : {
    'comically large scabbard' : 1,
  },
  st: {
    str: {
    },
    con: {
    },
    dex: {
      proficiency: 'bard class',
    },
    cha: {
      proficiency: 'bard class',
      advantage: 'gnome cunning racial',
    },
    int: {
      advantage: 'gnome cunning racial',
    },
    wis: {
      advantage: 'gnome cunning racial',
    },
  },
  skills: {
    qualifiers: {
      'jack of all trades': 'bard class level 3',
    },
    performance: {
      proficiency: 'bard class',
      expertise: 'bard class level 3',
    },
    history: {
      proficiency: 'bard class',
      expertise: 'bard class level 3',
      conditional: {
        double_prof: "artificer's lore",
        qualifier: ['magical items', 'alchemical objects', 'technological devices'],
      },
    },
    investigation: {
      proficiency: 'bard class',
    },
    stealth: {
      proficiency: 'criminal background',
    },
    deception: {
      proficiency: 'criminal background',
    },
  },
  attack:{
    archery: 'weapon style',
  },
  weaponsProf: {
    simple: 'tbd',
    'hand crossbow': '1d6',
    'long sword': '1d8',
    'rapier': '1d8',
  },
  armorProf: {
    'light armor': 14,
  },
  restlevel: 0,
  position: [0, 0, 0],
}

var player6 = {
  name : 'Midir',
  hp : [45, 55],
  ss : [],
  weapon : ['rapier','1d8'],
  armor_class: ['leather', 15],
  speed: 30,
  tagline: "I go fishing!",
  level: 3,
  class: 'warlock',
  race: 'human',
  height: '5ft8',
  weight: '160lbs',
  gold: 5,
  xp: 454,
  location: {
    Waxilium: 'Dread Dragonhide Saloon',
  },
  spellModifier: 'cha',
  class_traits: {
    activeSpells: {
    },
  },
  stats : {
    str: 15,
    int: 15,
    cha: 15,
    dex: 15,
    wis: 15,
    con: 15,
  },
  equipped: {
  },
  inventory : {
    'a few earrings' : 1,
  },
  st: {
    str: {
    },
    con: {
    },
    dex: {
      proficiency: 'bard class',
    },
    cha: {
      proficiency: 'bard class',
      advantage: 'gnome cunning racial',
    },
    int: {
      advantage: 'gnome cunning racial',
    },
    wis: {
      advantage: 'gnome cunning racial',
    },
  },
  skills: {
    qualifiers: {
      'jack of all trades': 'bard class level 3',
    },
    performance: {
      proficiency: 'bard class',
      expertise: 'bard class level 3',
    },
    history: {
      proficiency: 'bard class',
      expertise: 'bard class level 3',
      conditional: {
        double_prof: "artificer's lore",
        qualifier: ['magical items', 'alchemical objects', 'technological devices'],
      },
    },
    investigation: {
      proficiency: 'bard class',
    },
    stealth: {
      proficiency: 'criminal background',
    },
    deception: {
      proficiency: 'criminal background',
    },
  },
  attack:{
    archery: 'weapon style',
  },
  weaponsProf: {
    simple: 'tbd',
    'hand crossbow': '1d6',
    'long sword': '1d8',
    'rapier': '1d8',
  },
  armorProf: {
    'light armor': 14,
  },
  restlevel: 0,
  position: [0, 0, 0],
}


var adventurerList = [player1, player2, player3, player4, player5, player6];

module.exports = adventurerList;
//export default adventurerList;