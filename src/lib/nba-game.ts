import { TEAMS } from '../config/nba-teams';
import {
  NbaLegacyBoxScore,
  NbaLegacyBoxScoreActivePlayer,
  NbaLegacyBoxScoreGameDataTeam,
  NbaLegacyBoxScoreStats,
} from './legacy/nba-legacy-boxscore';

export interface NbaGame {
  id: string;
  arena: {
    name: string;
    city: string;
    state: string;
    country: string;
  };
  broadcaster: string;
  clock: string;
  currentPeriod: number;
  isComplete: boolean;
  isEndOfPeriod: boolean;
  isHalftime: boolean;
  isOvertime: boolean;
  isPlayoffs: boolean;
  isStarted: boolean;
  nugget: string;
  seriesRecord: string;
  startTimeEST: string;

  home: NbaGameTeam;
  visitor: NbaGameTeam;
}

export interface NbaGameTeam {
  id: string;
  lineScore: string[];
  name: string;
  players: NbaGamePlayer[];
  points: string;
  record: string;
  teamId: string;
  teamStats: NbaGameTeamStats;
  triCode: string;
}

export interface NbaGamePlayer {
  id: string;
  fullName: string;
  shortName: string;
  teamId: string;
  isOnCourt: boolean;
  points: string;
  pos: string;
  min: string;
  fgm: string;
  fga: string;
  fgp: string;
  ftm: string;
  fta: string;
  ftp: string;
  tpm: string;
  tpa: string;
  tpp: string;
  offReb: string;
  defReb: string;
  totReb: string;
  assists: string;
  pFouls: string;
  steals: string;
  turnovers: string;
  blocks: string;
  plusMinus: string;
  dnp: string;
}

export interface NbaGameTeamStats {
  fastBreakPoints: string;
  pointsInPaint: string;
  secondChancePoints: string;
  pointsOffTurnovers: string;
  points: string;
  fgm: string;
  fga: string;
  fgp: string;
  ftm: string;
  fta: string;
  ftp: string;
  tpm: string;
  tpa: string;
  tpp: string;
  offReb: string;
  defReb: string;
  totReb: string;
  assists: string;
  pFouls: string;
  steals: string;
  turnovers: string;
  blocks: string;
}

export function createNbaGame(game: NbaLegacyBoxScore): NbaGame {
  if (!game) {
    throw new Error('Unable to locate game');
  }
  return {
    id: game.basicGameData.gameId,
    arena: {
      name: game.basicGameData.arena.name,
      city: game.basicGameData.arena.city,
      state: game.basicGameData.arena.stateAbbr,
      country: game.basicGameData.arena.country,
    },
    broadcaster:
      game.basicGameData.watch.broadcast.broadcasters.national.length > 0
        ? game.basicGameData.watch.broadcast.broadcasters.national[0].shortName
        : '',
    clock: game.basicGameData.clock,
    currentPeriod: game.basicGameData.period.current,
    isComplete: game.basicGameData.statusNum > 2,
    isEndOfPeriod: game.basicGameData.period.isEndOfPeriod,
    isHalftime: game.basicGameData.period.isHalftime,
    isOvertime: +game.basicGameData.period.current > 4,
    isPlayoffs: game.basicGameData.seasonStageId === 4,
    isStarted: game.basicGameData.isGameActivated,
    nugget: game.basicGameData.nugget.text,
    seriesRecord: getSeriesRecord(game),
    startTimeEST: game.basicGameData.startTimeEastern,
    home: createScoreboardTeam(
      game.basicGameData.hTeam,
      game.stats.hTeam,
      game.stats.activePlayers,
    ),
    visitor: createScoreboardTeam(
      game.basicGameData.vTeam,
      game.stats.vTeam,
      game.stats.activePlayers,
    ),
  };
}

function getSeriesRecord(game: NbaLegacyBoxScore): string {
  let visitorWins = +game.basicGameData.vTeam.seriesWin;
  let homeWins = +game.basicGameData.hTeam.seriesWin;
  if (game.basicGameData.statusNum > 2) {
    if (game.basicGameData.hTeam.score > game.basicGameData.vTeam.score) {
      homeWins = homeWins + 1;
    }

    if (game.basicGameData.vTeam.score > game.basicGameData.hTeam.score) {
      visitorWins = visitorWins + 1;
    }
  }
  if (visitorWins > homeWins) {
    if (visitorWins === 4) {
      return `${game.basicGameData.vTeam.triCode} wins series ${visitorWins}-${homeWins}`;
    }
    return `${game.basicGameData.vTeam.triCode} leads ${visitorWins}-${homeWins}`;
  }
  if (homeWins > visitorWins) {
    if (homeWins === 4) {
      return `${game.basicGameData.hTeam.triCode} wins series ${homeWins}-${visitorWins}`;
    }
    return `${game.basicGameData.hTeam.triCode} leads ${homeWins}-${visitorWins}`;
  } else {
    return `Series tied ${homeWins}-${visitorWins}`;
  }
}

function createScoreboardTeam(
  team: NbaLegacyBoxScoreGameDataTeam,
  stats: NbaLegacyBoxScoreStats,
  players: NbaLegacyBoxScoreActivePlayer[],
): NbaGameTeam {
  const teamDetails = TEAMS.find(t => t.teamId === team.teamId);

  if (!teamDetails) {
    throw new Error("Couldn't find team");
  }
  return {
    id: teamDetails.teamId,
    name: teamDetails.fullName,
    triCode: teamDetails.tricode,
    points: team.score,
    lineScore: team.linescore.map(score => score.score),
    record: `${team.win}-${team.loss}`,
    players: createNbaGamePlayer(players, team.teamId),
    teamId: teamDetails.teamId,
    teamStats: {
      fastBreakPoints: stats.fastBreakPoints,
      pointsInPaint: stats.pointsInPaint,
      secondChancePoints: stats.secondChancePoints,
      pointsOffTurnovers: stats.pointsOffTurnovers,
      points: stats.totals.points,
      fgm: stats.totals.fgm,
      fga: stats.totals.fga,
      fgp: stats.totals.fgp,
      ftm: stats.totals.ftm,
      fta: stats.totals.fta,
      ftp: stats.totals.ftp,
      tpm: stats.totals.tpm,
      tpa: stats.totals.tpa,
      tpp: stats.totals.tpp,
      offReb: stats.totals.offReb,
      defReb: stats.totals.defReb,
      totReb: stats.totals.totReb,
      assists: stats.totals.assists,
      pFouls: stats.totals.pFouls,
      steals: stats.totals.steals,
      turnovers: stats.totals.turnovers,
      blocks: stats.totals.blocks,
    },
  };
}

function createNbaGamePlayer(
  stats: NbaLegacyBoxScoreActivePlayer[],
  teamId: string,
): NbaGamePlayer[] {
  return stats
    .filter(p => p.teamId === teamId)
    .map(tp => ({
      id: tp.personId,
      fullName: `${tp.firstName} ${tp.lastName}`,
      shortName: `${tp.firstName.charAt(0)}. ${tp.lastName}`,
      teamId: tp.teamId,
      isOnCourt: tp.isOnCourt,
      points: tp.points,
      pos: tp.pos,
      min: tp.min,
      fgm: tp.fgm,
      fga: tp.fga,
      fgp: tp.fgp,
      ftm: tp.ftm,
      fta: tp.fta,
      ftp: tp.ftp,
      tpm: tp.tpm,
      tpa: tp.tpa,
      tpp: tp.tpp,
      offReb: tp.offReb,
      defReb: tp.defReb,
      totReb: tp.totReb,
      assists: tp.assists,
      pFouls: tp.pFouls,
      steals: tp.steals,
      turnovers: tp.turnovers,
      blocks: tp.blocks,
      plusMinus: tp.plusMinus,
      dnp: tp.dnp,
    }));
}
