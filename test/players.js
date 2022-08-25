var player1 = {
  name : 'Pergilius von Waxilium',
  hp : [45, 55],
  ss : [[2,2], [0, 1]],
  weapon : ['spear','1d8'],
  armor_class: ['chain mail', 15],
  tagline: "Here to kick ass and check gum...and I'm all outta gum!",
  level: 3,
  class: 'bard',
  race: 'human',
  height: '5ft8',
  weight: '160lbs',
  gold: 5,
  xp: 454,
  restlevel: 0,
  position: [0, 0, 0],
  location: {
    Waxilium: 'Dread Dragonhide Saloon',
  },
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
  inventory : {
    'sandwich' : 1
  }
}


var player2 = {
  name : 'Po',
  hp : [45, 55],
  ss : [],
  weapon : ['fists of fury','1d6'],
  armor_class: ['leather', 15],
  tagline: "Nothing can stand before my Fists of Fury!",
  level: 3,
  class: 'monk',
  race: 'human',
  height: '5ft10',
  weight: '250lbs',
  gold: 5,
  xp: 454,
  restlevel: 0,
  position: [0, 0, 0],
  location: {
    Waxilium: 'Dread Dragonhide Saloon',
  },
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
  inventory : {
    'jug of fire wine' : 1,
  }
}

var player3 = {
  name : 'Lia',
  hp : [45, 55],
  ss : [],
  weapon : ['Longsword','1d8'],
  armor_class: ['leather', 15],
  tagline: "Cut it outttttt!!!",
  level: 3,
  class: 'fighter',
  race: 'sun elf',
  height: '5ft7',
  weight: '130lbs',
  gold: 5,
  xp: 454,
  restlevel: 0,
  position: [0, 0, 0],
  location: {
    Waxilium: 'Dread Dragonhide Saloon',
  },
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
  inventory : {
    'celestial locket' : 1,
  }
}

var player4 = {
  name : 'Cassian',
  hp : [45, 55],
  ss : [],
  weapon : ['Knifes','1d6'],
  armor_class: ['leather', 15],
  tagline: "that kid was stronger than he looked!",
  level: 3,
  class: 'rogue',
  race: 'dark elf',
  height: '5ft8',
  weight: '160lbs',
  gold: 5,
  xp: 454,
  restlevel: 0,
  position: [0, 0, 0],
  location: {
    Waxilium: 'Dread Dragonhide Saloon',
  },
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
  inventory : {
    'bag of tricks' : 1,
  }
}

var player5 = {
  name : 'Zovinar',
  hp : [45, 55],
  ss : [],
  weapon : ['rapier','1d8'],
  armor_class: ['leather', 15],
  tagline: "let me handle this one guys!",
  level: 3,
  class: 'fighter',
  race: 'human',
  height: '5ft8',
  weight: '160lbs',
  gold: 5,
  xp: 454,
  restlevel: 0,
  position: [0, 0, 0],
  location: {
    Waxilium: 'Dread Dragonhide Saloon',
  },
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
  inventory : {
    'comically large scabbard' : 1,
  }
}

var player6 = {
  name : 'Midir',
  hp : [45, 55],
  ss : [],
  weapon : ['rapier','1d8'],
  armor_class: ['leather', 15],
  tagline: "I go fishing!",
  level: 3,
  class: 'warlock',
  race: 'human',
  height: '5ft8',
  weight: '160lbs',
  gold: 5,
  xp: 454,
  restlevel: 0,
  position: [0, 0, 0],
  location: {
    Waxilium: 'Dread Dragonhide Saloon',
  },
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
  inventory : {
    'a few earrings' : 1,
  }
}


var adventurerList = [player1, player2, player3, player4, player5, player6];

module.exports = adventurerList;
//export default adventurerList;