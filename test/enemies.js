var enemy1 = {
  name : 'Giant Scorpion',
  hp : [45, 55],
  ss : [[2,2], [0, 1]],
  weapon : ['Giant Pincer','1d8'],
  armor_class: ['chain mail', 15],
  tagline: "...",
  level: 3,
  class: 'N/A',
  race: 'Monster',
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
  },
  stats : {
    str: 15,
    int: 15,
    cha: 15,
    agi: 15,
    wis: 15,
    con: 15,
  },
  inventory : {
    'Giant Fang' : 1
  }
}


var enemy2 = {
  name : 'Giant Spider',
  hp : [45, 55],
  ss : [],
  weapon : ['Giant Fang','1d6'],
  armor_class: ['leather', 15],
  tagline: "...",
  level: 3,
  class: 'N/A',
  race: 'monster',
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
    agi: 15,
    wis: 15,
    con: 15,
  },
  inventory : {
    'Giant Fang' : 1,
  }
}


var enemyList = [enemy1, enemy2];

module.exports = enemyList;
//export default enemyList;