import { NbaLegacyPbp } from './legacy/nba-legacy-pbp';
import { getTeam } from '../utils';

// eventMsgType's - actually guessing
// 1 Made shot
// 2 Missed shot
// 3 FT
// 4 REB
// 5 TO
// 6 Foul
// 8 substitution
// 9 timeout
// 10 Jump Ball
// 12 Start Period
// 13 End Period
// 18 Instant Replay Review
// 20 Stoppage

export interface NbaPlayByPlay {
  clock: string;
  eventType: string;
  eventMsgKey: string;
  description: string;
  personId: string;
  teamId: string;
  teamName: string;
  teamTriCode: string;
  homeScore: string;
  visitorScore: string;
  isScoreChange: boolean;
}

const EVENT_TYPES: {
  [key: string]: string;
} = {
  '1': 'MADE_SHOT',
  '2': 'MISSED_SHOT',
  '3': 'FREE_THROW',
  '4': 'REBOUND',
  '5': 'TURNOVER',
  '6': 'FOUL',
  '7': 'VIOLATION',
  '8': 'SUBSTITUTION',
  '9': 'TIMEOUT',
  '10': 'JUMP_BALL',
  '12': 'START_PERIOD',
  '13': 'END_PERIOD',
  '18': 'INSTANT_REPLAY_REVIEW',
  '20': 'STOPPAGE',
};

export function createNbaPlayByPlay(pbp: NbaLegacyPbp): NbaPlayByPlay[] {
  return pbp.plays.map(plays => ({
    clock: plays.clock,
    eventType: EVENT_TYPES[plays.eventMsgType] || '',
    eventMsgKey: plays.eventMsgType,
    description: plays.description,
    personId: plays.personId,
    teamId: plays.teamId,
    teamName: getTeam(plays.teamId).fullName,
    teamTriCode: getTeam(plays.teamId).tricode,
    homeScore: plays.hTeamScore,
    visitorScore: plays.vTeamScore,
    isScoreChange: plays.isScoreChange,
  }));
}
