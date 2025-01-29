// 선수 데이터
export const getPlayerProfile = (stats) => [
  { label: "Nationality", value: stats.nationality },
  { label: "Place of Birth", value: stats.placeOfBirth },
  { label: "Position", value: stats.position },
  { label: "Date of Birth", value: stats.dob },
  { label: "Height", value: stats.height },
  { label: "Debut", value: stats.debut },
];

// 출전 데이터
export const getPlayerAppearances = (stats) => [
  { label: "Team Appearances", value: stats.appearances },
  { label: "Minutes Played", value: stats.minutesPlayed },
  { label: "Starts", value: stats.starts },
  { label: "Subbed On/Off", value: stats.subbedOnOff },
];

// 터치 데이터
export const getPlayerTouches = (stats) => [
  { label: "Total Touches", value: stats.totalTouches },
  { label: "Tackles Won/Lost", value: stats.tacklesWonLost },
  { label: "Clearances", value: stats.cleareances },
  { label: "Interceptions", value: stats.interceptions },
  { label: "Duels Won / Lost", value: stats.duelsWonLost },
  { label: "Blocks", value: stats.blocks },
];

// 파울 데이터
export const getPlayerFouls = (stats) => [
  { label: "Fouls Drawn", value: stats.foulsDrawn },
  { label: "Fouls Committed", value: stats.foulsCommitted },
  { label: "Yellow Card", value: stats.yellowCard },
  { label: "Red Card", value: stats.redCard },
];

// 득점 데이터
export const getPlayerGoal1 = (stats) => [
  { label: "Total Goals", value: stats.totalGoals },
  { label: "Goals Per Match", value: stats.goalsPerMatch },
  { label: "Minutes Per Goal", value: stats.minutesPerGoal },
];

export const getPlayerGoal2 = (stats) => [
  { label: "Scored With Head", value: stats.scoredWithHead },
  { label: "Scored With Left", value: stats.scoredWithLeft },
  { label: "Scored With Right", value: stats.scoredWithRight },
  { label: "Penalties", value: stats.penalties },
  { label: "Free Kicks", value: stats.freeKicks },
];

// 선방 데이터
export const getPlayerSaves = (stats) => [
  { label: "Total Saves", value: stats.totalSaves },
  { label: "Clean Sheets", value: stats.cleanSheets },
  { label: "Saves Made - Catch", value: stats.savesMadeCatch },
  { label: "Saves Made - Punch", value: stats.savesMadePunch },
  { label: "Punches", value: stats.punches },
  { label: "Catches", value: stats.catches },
];

// 패스 데이터
export const getPlayerPasses = (stats) => [
  { label: "Total Passes", value: stats.totalPasses },
  { label: "Key Passes", value: stats.keyPasses },
  { label: "Successful Crosses", value: stats.successfulCrosses },
  { label: "Assists", value: stats.assists },
];
