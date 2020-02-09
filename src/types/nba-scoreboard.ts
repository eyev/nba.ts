import { NbaLegacyScoreboard, NbaLegacyScoreboardGame, NbaLegacyScoreboardTeam } from './nba-legacy-scoreboard';
import { TEAMS } from '../config/nba-teams';

export interface NbaScoreboardGame {
  id: string;
  broadcaster: string;
  clock: string;
  currentPeriod: number;
  isComplete: boolean;
  isHalftime: boolean;
  isOvertime: boolean;
  isPlayoffs: boolean;
  isStarted: boolean;
  seriesRecord: string;
  startTimeEST: string;
  home: NbaScoreBoardGameTeam;
  visitor: NbaScoreBoardGameTeam;
}

interface NbaScoreBoardGameTeam {
  id: string;
  name: string;
  triCode: string;
  record: string;
  points: string;
  lineScore: string[];
}

export function createScoreBoard(scoreboard: NbaLegacyScoreboard): NbaScoreboardGame[] {
  return scoreboard.games.map(game => ({
    id: game.gameId,
    broadcaster:
      game.watch.broadcast.broadcasters.national.length > 0 ? game.watch.broadcast.broadcasters.national[0].shortName : '',
    clock: game.clock,
    currentPeriod: +game.period.current,
    isComplete: +game.statusNum > 2,
    isHalftime: game.period.isHalftime,
    isOvertime: +game.period.current > 4,
    isPlayoffs: game.seasonStageId === 4,
    isStarted: game.isGameActivated,
    seriesRecord: getSeriesRecord(game),
    startTimeEST: game.startTimeEastern,
    home: createScoreboardTeam(game.hTeam),
    visitor: createScoreboardTeam(game.vTeam),
  }));
}

function getSeriesRecord(game: NbaLegacyScoreboardGame): string {
  let visitorWins = +game.vTeam.seriesWin;
  let homeWins = +game.hTeam.seriesWin;
  if (game.statusNum > 2) {
    if (game.hTeam.score > game.vTeam.score) {
      homeWins = homeWins + 1;
    }

    if (game.vTeam.score > game.hTeam.score) {
      visitorWins = visitorWins + 1;
    }
  }
  if (visitorWins > homeWins) {
    if (visitorWins === 4) {
      return `${game.vTeam.triCode} wins series ${visitorWins}-${homeWins}`;
    }
    return `${game.vTeam.triCode} leads ${visitorWins}-${homeWins}`;
  }
  if (homeWins > visitorWins) {
    if (homeWins === 4) {
      return `${game.hTeam.triCode} wins series ${homeWins}-${visitorWins}`;
    }
    return `${game.hTeam.triCode} leads ${homeWins}-${visitorWins}`;
  } else {
    return `Series tied ${homeWins}-${visitorWins}`;
  }
}

function createScoreboardTeam(team: NbaLegacyScoreboardTeam): NbaScoreBoardGameTeam {
  const teamDetails = TEAMS.find(t => t.teamId === team.teamId);

  if(!teamDetails) {
    throw new Error('Couldn\'t find team');
  }
  return {
    id: teamDetails.teamId,
    name: teamDetails.fullName,
    triCode: teamDetails.tricode,
    points: team.score,
    lineScore: team.linescore.map(score => score.score),
    record: `${team.win}-${team.loss}`
  }
}
