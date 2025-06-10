import { GameRecord, Player, Achievement } from '../types';

export const mockPlayers: Player[] = [
  { id: '1', name: 'Ades', avatar: '💪🏻', joinDate: '2021-10-15' },
  { id: '2', name: 'Avishai', avatar: '🔥', joinDate: '2021-10-15' },
  { id: '3', name: 'Ziner', avatar: '🍕', joinDate: '2021-10-15' },
  { id: '4', name: 'Tomer', avatar: '🩴', joinDate: '2021-02-15' }
];

export const expansions = [
  'Base Game',
  'Seafarers',
  'Cities & Knights',
  'Traders & Barbarians',
  'Explorers & Pirates',
  'Rise of the Inkas',
];

export const mockGames: GameRecord[] = [
  {
    "id": "1",
    "date": "2021-10-15",
    "expansion": "Cities & Knights",
    "winner": "Ades",
    "duration": null,
    "players": [
      {
        "playerId": "1",
        "playerName": "Ades",
        "score": 13,
        "startingPosition": null,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "2",
        "playerName": "Ziner",
        "score": 9,
        "startingPosition": null,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "3",
        "playerName": "Avishai",
        "score": 11,
        "startingPosition": null,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      }
    ]
  },
  {
    "id": "2",
    "date": "2021-10-15",
    "expansion": "Cities & Knights",
    "winner": "Ziner",
    "duration": null,
    "players": [
      {
        "playerId": "1",
        "playerName": "Ades",
        "score": 10,
        "startingPosition": null,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "2",
        "playerName": "Ziner",
        "score": 13,
        "startingPosition": null,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "3",
        "playerName": "Avishai",
        "score": 11,
        "startingPosition": null,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      }
    ]
  },
  {
    "id": "3",
    "date": "2021-10-21",
    "expansion": "Cities & Knights",
    "winner": "Ades",
    "duration": null,
    "players": [
      {
        "playerId": "1",
        "playerName": "Ades",
        "score": 13,
        "startingPosition": null,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "2",
        "playerName": "Ziner",
        "score": 8,
        "startingPosition": null,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "3",
        "playerName": "Avishai",
        "score": 6,
        "startingPosition": null,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      }
    ]
  },
  {
    "id": "4",
    "date": "2021-10-21",
    "expansion": "Cities & Knights",
    "winner": "Avishai",
    "duration": null,
    "players": [
      {
        "playerId": "1",
        "playerName": "Ades",
        "score": 12,
        "startingPosition": null,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "2",
        "playerName": "Ziner",
        "score": 7,
        "startingPosition": null,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "3",
        "playerName": "Avishai",
        "score": 13,
        "startingPosition": null,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      }
    ]
  },
  {
    "id": "5",
    "date": "2021-10-28",
    "expansion": "Cities & Knights",
    "winner": "Ziner",
    "duration": null,
    "players": [
      {
        "playerId": "1",
        "playerName": "Ades",
        "score": 5,
        "startingPosition": null,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "2",
        "playerName": "Ziner",
        "score": 13,
        "startingPosition": null,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "3",
        "playerName": "Avishai",
        "score": 7,
        "startingPosition": null,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      }
    ]
  },
  {
    "id": "6",
    "date": "2021-12-02",
    "expansion": "Cities & Knights",
    "winner": "Ades",
    "duration": null,
    "players": [
      {
        "playerId": "1",
        "playerName": "Ades",
        "score": 13,
        "startingPosition": null,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "2",
        "playerName": "Ziner",
        "score": 6,
        "startingPosition": null,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "4",
        "playerName": "Tomer",
        "score": 4,
        "startingPosition": null,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      }
    ]
  },
  {
    "id": "7",
    "date": "2021-12-02",
    "expansion": "Cities & Knights",
    "winner": "Ades",
    "duration": null,
    "players": [
      {
        "playerId": "1",
        "playerName": "Ades",
        "score": 13,
        "startingPosition": null,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "2",
        "playerName": "Ziner",
        "score": 9,
        "startingPosition": null,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "4",
        "playerName": "Tomer",
        "score": 4,
        "startingPosition": null,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      }
    ]
  },
  {
    "id": "8",
    "date": "2021-12-05",
    "expansion": "Cities & Knights",
    "winner": "Ziner",
    "duration": null,
    "players": [
      {
        "playerId": "1",
        "playerName": "Ades",
        "score": 11,
        "startingPosition": null,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "2",
        "playerName": "Ziner",
        "score": 13,
        "startingPosition": null,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "4",
        "playerName": "Tomer",
        "score": 12,
        "startingPosition": null,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      }
    ]
  },
  {
    "id": "9",
    "date": "2021-12-05",
    "expansion": "Base Game",
    "winner": "Avishai",
    "duration": null,
    "players": [
      {
        "playerId": "3",
        "playerName": "Avishai",
        "score": 10,
        "startingPosition": null,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      }
    ]
  },
  {
    "id": "10",
    "date": "2021-12-05",
    "expansion": "Base Game",
    "winner": "Ades",
    "duration": null,
    "players": [
      {
        "playerId": "1",
        "playerName": "Ades",
        "score": 10,
        "startingPosition": null,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "3",
        "playerName": "Avishai",
        "score": 6,
        "startingPosition": null,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      }
    ]
  },
  {
    "id": "11",
    "date": "2021-12-16",
    "expansion": "Cities & Knights",
    "winner": "Ades",
    "duration": null,
    "players": [
      {
        "playerId": "1",
        "playerName": "Ades",
        "score": 13,
        "startingPosition": 4,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "2",
        "playerName": "Ziner",
        "score": 6,
        "startingPosition": 2,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "3",
        "playerName": "Avishai",
        "score": 4,
        "startingPosition": 1,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "4",
        "playerName": "Tomer",
        "score": 5,
        "startingPosition": 3,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      }
    ]
  },
  {
    "id": "12",
    "date": "2021-12-16",
    "expansion": "Cities & Knights",
    "winner": "Avishai",
    "duration": null,
    "players": [
      {
        "playerId": "1",
        "playerName": "Ades",
        "score": 7,
        "startingPosition": 3,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "2",
        "playerName": "Ziner",
        "score": 9,
        "startingPosition": 1,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "3",
        "playerName": "Avishai",
        "score": 13,
        "startingPosition": 4,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "4",
        "playerName": "Tomer",
        "score": 5,
        "startingPosition": 2,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      }
    ]
  },
  {
    "id": "13",
    "date": "2021-12-23",
    "expansion": "Cities & Knights",
    "winner": "Ziner",
    "duration": null,
    "players": [
      {
        "playerId": "1",
        "playerName": "Ades",
        "score": 5,
        "startingPosition": 1,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "2",
        "playerName": "Ziner",
        "score": 14,
        "startingPosition": 2,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      }
    ]
  },
  {
    "id": "14",
    "date": "2021-12-23",
    "expansion": "Cities & Knights",
    "winner": "Ades",
    "duration": null,
    "players": [
      {
        "playerId": "1",
        "playerName": "Ades",
        "score": 13,
        "startingPosition": 3,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "2",
        "playerName": "Ziner",
        "score": 11,
        "startingPosition": 1,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      }
    ]
  },
  {
    "id": "15",
    "date": "2021-12-23",
    "expansion": "Cities & Knights",
    "winner": "Ades",
    "duration": null,
    "players": [
      {
        "playerId": "1",
        "playerName": "Ades",
        "score": 13,
        "startingPosition": 2,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "2",
        "playerName": "Ziner",
        "score": 11,
        "startingPosition": 3,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      }
    ]
  },
  {
    "id": "16",
    "date": "2022-01-14",
    "expansion": "Cities & Knights",
    "winner": "Ziner",
    "duration": null,
    "players": [
      {
        "playerId": "1",
        "playerName": "Ades",
        "score": 8,
        "startingPosition": 3,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "2",
        "playerName": "Ziner",
        "score": 13,
        "startingPosition": 2,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "3",
        "playerName": "Avishai",
        "score": 11,
        "startingPosition": 1,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      }
    ]
  },
  {
    "id": "17",
    "date": "2022-02-01",
    "expansion": "Cities & Knights",
    "winner": "Tomer",
    "duration": null,
    "players": [
      {
        "playerId": "1",
        "playerName": "Ades",
        "score": 12,
        "startingPosition": 2,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "2",
        "playerName": "Ziner",
        "score": 9,
        "startingPosition": 3,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "4",
        "playerName": "Tomer",
        "score": 13,
        "startingPosition": 1,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      }
    ]
  },
  {
    "id": "18",
    "date": "2022-03-24",
    "expansion": "Base Game",
    "winner": "Ades",
    "duration": null,
    "players": [
      {
        "playerId": "1",
        "playerName": "Ades",
        "score": 10,
        "startingPosition": 3,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "3",
        "playerName": "Avishai",
        "score": 9,
        "startingPosition": 2,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "4",
        "playerName": "Tomer",
        "score": 8,
        "startingPosition": 1,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      }
    ]
  },
  {
    "id": "19",
    "date": "2022-03-24",
    "expansion": "Base Game",
    "winner": "Ades",
    "duration": null,
    "players": [
      {
        "playerId": "1",
        "playerName": "Ades",
        "score": 10,
        "startingPosition": 3,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "3",
        "playerName": "Avishai",
        "score": 7,
        "startingPosition": 2,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "4",
        "playerName": "Tomer",
        "score": 6,
        "startingPosition": 1,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      }
    ]
  },
  {
    "id": "20",
    "date": "2022-09-01",
    "expansion": "Traders & Barbarians",
    "winner": "Avishai",
    "duration": null,
    "players": [
      {
        "playerId": "1",
        "playerName": "Ades",
        "score": 7,
        "startingPosition": 1,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "2",
        "playerName": "Ziner",
        "score": 9,
        "startingPosition": 3,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "3",
        "playerName": "Avishai",
        "score": 12,
        "startingPosition": 2,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      }
    ]
  },
  {
    "id": "21",
    "date": "2022-09-01",
    "expansion": "Traders & Barbarians",
    "winner": "Ades",
    "duration": null,
    "players": [
      {
        "playerId": "1",
        "playerName": "Ades",
        "score": 12,
        "startingPosition": 3,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "2",
        "playerName": "Ziner",
        "score": 6,
        "startingPosition": 2,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "3",
        "playerName": "Avishai",
        "score": 9,
        "startingPosition": 4,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      }
    ]
  },
  {
    "id": "22",
    "date": "2022-10-06",
    "expansion": "Traders & Barbarians",
    "winner": "Ades",
    "duration": null,
    "players": [
      {
        "playerId": "1",
        "playerName": "Ades",
        "score": 12,
        "startingPosition": 3,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "2",
        "playerName": "Ziner",
        "score": 10,
        "startingPosition": 2,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "3",
        "playerName": "Avishai",
        "score": 6,
        "startingPosition": 4,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "4",
        "playerName": "Tomer",
        "score": 7,
        "startingPosition": 1,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      }
    ]
  },
  {
    "id": "23",
    "date": "2022-10-29",
    "expansion": "Seafarers",
    "winner": "Ades",
    "duration": null,
    "players": [
      {
        "playerId": "1",
        "playerName": "Ades",
        "score": 16,
        "startingPosition": 3,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "2",
        "playerName": "Ziner",
        "score": 11,
        "startingPosition": 2,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "3",
        "playerName": "Avishai",
        "score": 11,
        "startingPosition": 4,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "4",
        "playerName": "Tomer",
        "score": 11,
        "startingPosition": 1,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      }
    ]
  },
  {
    "id": "24",
    "date": "2022-11-05",
    "expansion": "Seafarers",
    "winner": "Ades",
    "duration": null,
    "players": [
      {
        "playerId": "1",
        "playerName": "Ades",
        "score": 15,
        "startingPosition": 1,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "2",
        "playerName": "Ziner",
        "score": 11,
        "startingPosition": 2,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "4",
        "playerName": "Tomer",
        "score": 11,
        "startingPosition": 3,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      }
    ]
  },
  {
    "id": "25",
    "date": "2022-11-17",
    "expansion": "Cities & Knights",
    "winner": "Avishai",
    "duration": null,
    "players": [
      {
        "playerId": "2",
        "playerName": "Ziner",
        "score": 10,
        "startingPosition": 1,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "3",
        "playerName": "Avishai",
        "score": 13,
        "startingPosition": 3,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "4",
        "playerName": "Tomer",
        "score": 11,
        "startingPosition": 2,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      }
    ]
  },
  {
    "id": "26",
    "date": "2022-11-17",
    "expansion": "Seafarers",
    "winner": "Ades",
    "duration": null,
    "players": [
      {
        "playerId": "1",
        "playerName": "Ades",
        "score": 15,
        "startingPosition": 1,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "2",
        "playerName": "Ziner",
        "score": 9,
        "startingPosition": 2,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "3",
        "playerName": "Avishai",
        "score": 13,
        "startingPosition": 4,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "4",
        "playerName": "Tomer",
        "score": 10,
        "startingPosition": 3,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      }
    ]
  },
  {
    "id": "27",
    "date": "2022-12-03",
    "expansion": "Seafarers",
    "winner": "Tomer",
    "duration": null,
    "players": [
      {
        "playerId": "1",
        "playerName": "Ades",
        "score": 8,
        "startingPosition": 2,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "2",
        "playerName": "Ziner",
        "score": 6,
        "startingPosition": 3,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "3",
        "playerName": "Avishai",
        "score": 8,
        "startingPosition": 4,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "4",
        "playerName": "Tomer",
        "score": 15,
        "startingPosition": 1,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      }
    ]
  },
  {
    "id": "28",
    "date": "2022-12-12",
    "expansion": "Seafarers",
    "winner": "Ades",
    "duration": null,
    "players": [
      {
        "playerId": "1",
        "playerName": "Ades",
        "score": 15,
        "startingPosition": 1,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "2",
        "playerName": "Ziner",
        "score": 8,
        "startingPosition": 2,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "4",
        "playerName": "Tomer",
        "score": 13,
        "startingPosition": 3,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      }
    ]
  },
  {
    "id": "29",
    "date": "2022-12-15",
    "expansion": "Cities & Knights",
    "winner": "Ades",
    "duration": null,
    "players": [
      {
        "playerId": "1",
        "playerName": "Ades",
        "score": 13,
        "startingPosition": 2,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "2",
        "playerName": "Ziner",
        "score": 10,
        "startingPosition": 1,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "3",
        "playerName": "Avishai",
        "score": 11,
        "startingPosition": 3,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      }
    ]
  },
  {
    "id": "30",
    "date": "2022-12-20",
    "expansion": "Seafarers",
    "winner": "Ziner",
    "duration": null,
    "players": [
      {
        "playerId": "1",
        "playerName": "Ades",
        "score": 14,
        "startingPosition": 3,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "2",
        "playerName": "Ziner",
        "score": 15,
        "startingPosition": 1,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "4",
        "playerName": "Tomer",
        "score": 12,
        "startingPosition": 2,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      }
    ]
  },
  {
    "id": "31",
    "date": "2023-02-16",
    "expansion": "Seafarers",
    "winner": "Ziner",
    "duration": null,
    "players": [
      {
        "playerId": "1",
        "playerName": "Ades",
        "score": 13,
        "startingPosition": 2,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "2",
        "playerName": "Ziner",
        "score": 15,
        "startingPosition": 1,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "3",
        "playerName": "Avishai",
        "score": 12,
        "startingPosition": 3,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      }
    ]
  },
  {
    "id": "32",
    "date": "2023-04-08",
    "expansion": "Traders & Barbarians",
    "winner": "Tomer",
    "duration": null,
    "players": [
      {
        "playerId": "1",
        "playerName": "Ades",
        "score": 8,
        "startingPosition": 3,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "2",
        "playerName": "Ziner",
        "score": 8,
        "startingPosition": 4,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "3",
        "playerName": "Avishai",
        "score": 7,
        "startingPosition": 1,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "4",
        "playerName": "Tomer",
        "score": 12,
        "startingPosition": 2,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      }
    ]
  },
  {
    "id": "33",
    "date": "2023-06-23",
    "expansion": "Seafarers",
    "winner": "Tomer",
    "duration": null,
    "players": [
      {
        "playerId": "2",
        "playerName": "Ziner",
        "score": 11,
        "startingPosition": 3,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "3",
        "playerName": "Avishai",
        "score": 14,
        "startingPosition": 2,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "4",
        "playerName": "Tomer",
        "score": 15,
        "startingPosition": 1,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      }
    ]
  },
  {
    "id": "34",
    "date": "2023-07-11",
    "expansion": "Cities & Knights",
    "winner": "Ziner",
    "duration": null,
    "players": [
      {
        "playerId": "2",
        "playerName": "Ziner",
        "score": 13,
        "startingPosition": 1,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "3",
        "playerName": "Avishai",
        "score": 10,
        "startingPosition": 2,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "4",
        "playerName": "Tomer",
        "score": 9,
        "startingPosition": 3,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      }
    ]
  },
  {
    "id": "35",
    "date": "2023-07-28",
    "expansion": "Cities & Knights",
    "winner": "Ziner",
    "duration": null,
    "players": [
      {
        "playerId": "1",
        "playerName": "Ades",
        "score": 5,
        "startingPosition": 1,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "2",
        "playerName": "Ziner",
        "score": 13,
        "startingPosition": 3,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "3",
        "playerName": "Avishai",
        "score": 5,
        "startingPosition": 1,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      }
    ]
  },
  {
    "id": "36",
    "date": "2023-07-28",
    "expansion": "Cities & Knights",
    "winner": "Ades",
    "duration": null,
    "players": [
      {
        "playerId": "1",
        "playerName": "Ades",
        "score": 14,
        "startingPosition": 2,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "2",
        "playerName": "Ziner",
        "score": 5,
        "startingPosition": 1,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "3",
        "playerName": "Avishai",
        "score": 6,
        "startingPosition": 3,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      }
    ]
  },
  {
    "id": "37",
    "date": "2023-08-10",
    "expansion": "Cities & Knights",
    "winner": "Ades",
    "duration": null,
    "players": [
      {
        "playerId": "1",
        "playerName": "Ades",
        "score": 13,
        "startingPosition": 2,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "2",
        "playerName": "Ziner",
        "score": 10,
        "startingPosition": 1,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "3",
        "playerName": "Avishai",
        "score": 6,
        "startingPosition": 2,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      }
    ]
  },
  {
    "id": "38",
    "date": "2023-09-12",
    "expansion": "Traders & Barbarians",
    "winner": "Ziner",
    "duration": null,
    "players": [
      {
        "playerId": "1",
        "playerName": "Ades",
        "score": 11,
        "startingPosition": 2,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "2",
        "playerName": "Ziner",
        "score": 12,
        "startingPosition": 1,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "3",
        "playerName": "Avishai",
        "score": 8,
        "startingPosition": 3,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "4",
        "playerName": "Tomer",
        "score": 9,
        "startingPosition": 4,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      }
    ]
  },
  {
    "id": "39",
    "date": "2023-09-28",
    "expansion": "Cities & Knights",
    "winner": "Ades",
    "duration": null,
    "players": [
      {
        "playerId": "1",
        "playerName": "Ades",
        "score": 13,
        "startingPosition": 2,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "2",
        "playerName": "Ziner",
        "score": 8,
        "startingPosition": 1,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "3",
        "playerName": "Avishai",
        "score": 7,
        "startingPosition": 3,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      }
    ]
  },
  {
    "id": "40",
    "date": "2024-01-06",
    "expansion": "Cities & Knights",
    "winner": "Ziner",
    "duration": null,
    "players": [
      {
        "playerId": "1",
        "playerName": "Ades",
        "score": 5,
        "startingPosition": 1,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "2",
        "playerName": "Ziner",
        "score": 13,
        "startingPosition": 3,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "3",
        "playerName": "Avishai",
        "score": 9,
        "startingPosition": 2,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      }
    ]
  },
  {
    "id": "41",
    "date": "2024-02-03",
    "expansion": "Traders & Barbarians",
    "winner": "Ades",
    "duration": null,
    "players": [
      {
        "playerId": "1",
        "playerName": "Ades",
        "score": 9,
        "startingPosition": 2,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "2",
        "playerName": "Ziner",
        "score": 13,
        "startingPosition": 3,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "3",
        "playerName": "Avishai",
        "score": 7,
        "startingPosition": 1,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "4",
        "playerName": "Tomer",
        "score": 8,
        "startingPosition": 4,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      }
    ]
  },
  {
    "id": "42",
    "date": "2024-02-29",
    "expansion": "Cities & Knights",
    "winner": "Ziner",
    "duration": null,
    "players": [
      {
        "playerId": "1",
        "playerName": "Ades",
        "score": 8,
        "startingPosition": 3,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "2",
        "playerName": "Ziner",
        "score": 13,
        "startingPosition": 2,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "3",
        "playerName": "Avishai",
        "score": 8,
        "startingPosition": 1,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      }
    ]
  },
  {
    "id": "43",
    "date": "2024-03-29",
    "expansion": "Cities & Knights",
    "winner": "Ades",
    "duration": null,
    "players": [
      {
        "playerId": "1",
        "playerName": "Ades",
        "score": 7,
        "startingPosition": 2,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "2",
        "playerName": "Ziner",
        "score": 13,
        "startingPosition": 1,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "4",
        "playerName": "Tomer",
        "score": 5,
        "startingPosition": 3,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      }
    ]
  },
  {
    "id": "44",
    "date": "2024-04-26",
    "expansion": "Explorers & Pirates",
    "winner": "Tomer",
    "duration": null,
    "players": [
      {
        "playerId": "1",
        "playerName": "Ades",
        "score": 6,
        "startingPosition": 3,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "2",
        "playerName": "Ziner",
        "score": 9,
        "startingPosition": 2,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "4",
        "playerName": "Tomer",
        "score": 12,
        "startingPosition": 1,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      }
    ]
  },
  {
    "id": "45",
    "date": "2024-05-03",
    "expansion": "Explorers & Pirates",
    "winner": "Ziner",
    "duration": null,
    "players": [
      {
        "playerId": "1",
        "playerName": "Ades",
        "score": 12,
        "startingPosition": 2,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "2",
        "playerName": "Ziner",
        "score": 9,
        "startingPosition": 1,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "3",
        "playerName": "Avishai",
        "score": 10,
        "startingPosition": 4,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "4",
        "playerName": "Tomer",
        "score": 9,
        "startingPosition": 3,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      }
    ]
  },
  {
    "id": "46",
    "date": "2024-06-07",
    "expansion": "Cities & Knights",
    "winner": "Avishai",
    "duration": null,
    "players": [
      {
        "playerId": "1",
        "playerName": "Ades",
        "score": 7,
        "startingPosition": 1,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "2",
        "playerName": "Ziner",
        "score": 11,
        "startingPosition": 3,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "3",
        "playerName": "Avishai",
        "score": 13,
        "startingPosition": 4,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "4",
        "playerName": "Tomer",
        "score": 8,
        "startingPosition": 2,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      }
    ]
  },
  {
    "id": "47",
    "date": "2024-07-05",
    "expansion": "Cities & Knights",
    "winner": "Avishai",
    "duration": null,
    "players": [
      {
        "playerId": "1",
        "playerName": "Ades",
        "score": 8,
        "startingPosition": 1,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "2",
        "playerName": "Ziner",
        "score": 8,
        "startingPosition": 2,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "3",
        "playerName": "Avishai",
        "score": 13,
        "startingPosition": 3,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      }
    ]
  },
  {
    "id": "48",
    "date": "2024-09-06",
    "expansion": "Traders & Barbarians",
    "winner": "Ziner",
    "duration": null,
    "players": [
      {
        "playerId": "1",
        "playerName": "Ades",
        "score": 12,
        "startingPosition": 1,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "2",
        "playerName": "Ziner",
        "score": 9,
        "startingPosition": 3,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "3",
        "playerName": "Avishai",
        "score": 5,
        "startingPosition": 4,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "4",
        "playerName": "Tomer",
        "score": 7,
        "startingPosition": 2,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      }
    ]
  },
  {
    "id": "49",
    "date": "2024-11-10",
    "expansion": "Explorers & Pirates",
    "winner": "Ades",
    "duration": null,
    "players": [
      {
        "playerId": "1",
        "playerName": "Ades",
        "score": 12,
        "startingPosition": 2,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "2",
        "playerName": "Ziner",
        "score": 14,
        "startingPosition": 3,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "3",
        "playerName": "Avishai",
        "score": 8,
        "startingPosition": 1,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      }
    ]
  },
  {
    "id": "50",
    "date": "2025-03-01",
    "expansion": "Cities & Knights",
    "winner": "Ades",
    "duration": null,
    "players": [
      {
        "playerId": "1",
        "playerName": "Ades",
        "score": 9,
        "startingPosition": 3,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "2",
        "playerName": "Ziner",
        "score": 13,
        "startingPosition": 2,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      },
      {
        "playerId": "3",
        "playerName": "Avishai",
        "score": 8,
        "startingPosition": 1,
        "settlements": null,
        "cities": null,
        "longestRoad": false,
        "largestArmy": false
      }
    ]
  }
];

export const achievements: Achievement[] = [
  {
    id: 'first_win',
    name: 'First Victory',
    description: 'Win your first game',
    icon: '🏆',
    rarity: 'common'
  },
  {
    id: 'perfect_score',
    name: 'Perfect Score',
    description: 'Score 15+ points in a single game',
    icon: '⭐',
    rarity: 'epic'
  },
  {
    id: 'win_streak_3',
    name: 'Hat Trick',
    description: 'Win 3 games in a row',
    icon: '🔥',
    rarity: 'rare'
  },
  {
    id: 'expansion_master',
    name: 'Expansion Master',
    description: 'Win with every expansion',
    icon: '🎯',
    rarity: 'legendary'
  },
  {
    id: 'road_warrior',
    name: 'Road Warrior',
    description: 'Win Longest Road 5 times',
    icon: '🛣️',
    rarity: 'rare'
  },
  {
    id: 'army_general',
    name: 'Army General',
    description: 'Win Largest Army 5 times',
    icon: '⚔️',
    rarity: 'rare'
  },
  {
    id: 'comeback_king',
    name: 'Comeback King',
    description: 'Win after being in last place',
    icon: '👑',
    rarity: 'epic'
  },
  {
    id: 'city_builder',
    name: 'City Builder',
    description: 'Build 5+ cities in a single game',
    icon: '🏙️',
    rarity: 'rare'
  },
  {
    id: 'settlement_spammer',
    name: 'Settlement Spammer',
    description: 'Build all 5 settlements in a game',
    icon: '🏘️',
    rarity: 'common'
  },
  {
    id: 'double_trouble',
    name: 'Double Trouble',
    description: 'Win both Longest Road and Largest Army in one game',
    icon: '⚡',
    rarity: 'epic'
  },
  {
    id: 'speed_demon',
    name: 'Speed Demon',
    description: 'Win a game in under 60 minutes',
    icon: '💨',
    rarity: 'rare'
  },
  {
    id: 'marathon_master',
    name: 'Marathon Master',
    description: 'Win a game lasting over 2 hours',
    icon: '⏰',
    rarity: 'rare'
  },
  {
    id: 'consistent_performer',
    name: 'Consistent Performer',
    description: 'Score within 2 points of your average for 5 games',
    icon: '📊',
    rarity: 'epic'
  },
  {
    id: 'clutch_player',
    name: 'Clutch Player',
    description: 'Win 5 games decided by 2 points or less',
    icon: '🎯',
    rarity: 'legendary'
  },
  {
    id: 'position_master',
    name: 'Position Master',
    description: 'Win from every starting position',
    icon: '🎲',
    rarity: 'legendary'
  }
];