import { NbaLegacyInternal } from './nba-legacy-internal';

export interface NbaLegacyBoxScore {
  _internal: NbaLegacyInternal;
  basicGameData: NbaLegacyBoxScoreGameData;
  stats: {
    vTeam: NbaLegacyBoxScoreStats;
    hTeam: NbaLegacyBoxScoreStats;
    activePlayers: NbaLegacyBoxScoreActivePlayer[];
  };
}

export interface NbaLegacyBoxScoreGameDataArena {
  name: string;
  isDomestic: boolean;
  city: string;
  stateAbbr: string;
  country: string;
}

export interface NbaLegacyBoxScoreGameDataTickets {
  mobileApp: string;
  desktopWeb: string;
  mobileWeb: string;
  leagGameInfo: string;
  leagTix: string;
}

export interface NbaLegacyBoxScoreGameDataGameDuration {
  hours: string;
  minutes: string;
}

export interface NbaLegacyBoxScoreGameDataPeriod {
  current: number;
  type: number;
  maxRegular: number;
  isHalftime: boolean;
  isEndOfPeriod: boolean;
}

export interface NbaLegacyBoxScoreGameDataLinescore {
  score: string;
}

export interface NbaLegacyBoxScoreGameDataLinescore2 {
  score: string;
}

export interface NbaLegacyBoxScoreGameDataTeam {
  teamId: string;
  triCode: string;
  win: string;
  loss: string;
  seriesWin: string;
  seriesLoss: string;
  score: string;
  linescore: NbaLegacyBoxScoreGameDataLinescore2[];
}

export interface NbaLegacyBoxScoreGameDataCanadian {
  shortName: string;
  longName: string;
}

export interface NbaLegacyBoxScoreGameDataVTeam2 {
  shortName: string;
  longName: string;
}

export interface NbaLegacyBoxScoreGameDataHTeam2 {
  shortName: string;
  longName: string;
}

export interface NbaLegacyBoxScoreGameDataBroadcasters {
  national: any[];
  canadian: NbaLegacyBoxScoreGameDataCanadian[];
  vTeam: NbaLegacyBoxScoreGameDataVTeam2[];
  hTeam: NbaLegacyBoxScoreGameDataHTeam2[];
  spanish_hTeam: any[];
  spanish_vTeam: any[];
  spanish_national: any[];
}

export interface NbaLegacyBoxScoreGameDataStream {
  streamType: string;
  isOnAir: boolean;
  doesArchiveExist: boolean;
  isArchiveAvailToWatch: boolean;
  streamId: string;
  duration: number;
}

export interface NbaLegacyBoxScoreGameDataVideo {
  regionalBlackoutCodes: string;
  canPurchase: boolean;
  isLeaguePass: boolean;
  isNationalBlackout: boolean;
  isTNTOT: boolean;
  isVR: boolean;
  tntotIsOnAir: boolean;
  isNextVR: boolean;
  isNBAOnTNTVR: boolean;
  isMagicLeap: boolean;
  isOculusVenues: boolean;
  streams: NbaLegacyBoxScoreGameDataStream[];
  deepLink: any[];
}

export interface NbaLegacyBoxScoreGameDataStream2 {
  language: string;
  isOnAir: boolean;
  streamId: string;
}

export interface NbaLegacyBoxScoreGameDataNational {
  streams: NbaLegacyBoxScoreGameDataStream2[];
  broadcasters: any[];
}

export interface NbaLegacyBoxScoreGameDataBroadcaster {
  shortName: string;
  longName: string;
}

export interface NbaLegacyBoxScoreGameDataVTeam3 {
  streams: NbaLegacyBoxScoreGameDataStream2[];
  broadcasters: NbaLegacyBoxScoreGameDataBroadcaster[];
}

export interface NbaLegacyBoxScoreGameDataBroadcaster2 {
  shortName: string;
  longName: string;
}

export interface NbaLegacyBoxScoreGameDataHTeam3 {
  streams: NbaLegacyBoxScoreGameDataStream2[];
  broadcasters: NbaLegacyBoxScoreGameDataBroadcaster2[];
}

export interface NbaLegacyBoxScoreGameDataAudio {
  national: NbaLegacyBoxScoreGameDataNational;
  vTeam: NbaLegacyBoxScoreGameDataVTeam3;
  hTeam: NbaLegacyBoxScoreGameDataHTeam3;
}

export interface NbaLegacyBoxScoreGameDataBroadcast {
  broadcasters: NbaLegacyBoxScoreGameDataBroadcasters;
  video: NbaLegacyBoxScoreGameDataVideo;
  audio: NbaLegacyBoxScoreGameDataAudio;
}

export interface NbaLegacyBoxScoreGameDataWatch {
  broadcast: NbaLegacyBoxScoreGameDataBroadcast;
}

export interface NbaLegacyBoxScoreGameDataOfficials {
  firstNameLastName: string;
}

export interface NbaLegacyBoxScoreGameData {
  seasonStageId: number;
  seasonYear: string;
  leagueName: string;
  gameId: string;
  arena: NbaLegacyBoxScoreGameDataArena;
  isGameActivated: boolean;
  statusNum: number;
  extendedStatusNum: number;
  startTimeEastern: string;
  startTimeUTC: Date;
  endTimeUTC: Date;
  startDateEastern: string;
  homeStartDate: string;
  homeStartTime: string;
  visitorStartDate: string;
  visitorStartTime: string;
  gameUrlCode: string;
  clock: string;
  isBuzzerBeater: boolean;
  isPreviewArticleAvail: boolean;
  isRecapArticleAvail: boolean;
  nugget: {
    text: string;
  };
  attendance: string;
  tickets: NbaLegacyBoxScoreGameDataTickets;
  hasGameBookPdf: boolean;
  isStartTimeTBD: boolean;
  gameDuration: NbaLegacyBoxScoreGameDataGameDuration;
  period: NbaLegacyBoxScoreGameDataPeriod;
  vTeam: NbaLegacyBoxScoreGameDataTeam;
  hTeam: NbaLegacyBoxScoreGameDataTeam;
  watch: NbaLegacyBoxScoreGameDataWatch;
  officials: {
    formatted: NbaLegacyBoxScoreGameDataOfficials[];
  };
}

export interface Totals {
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
  plusMinus: string;
  min: string;
  short_timeout_remaining: string;
  full_timeout_remaining: string;
  team_fouls: string;
}

export interface NbaLegacyBoxScoreStatsPlayer {
  personId: string;
  firstName: string;
  lastName: string;
}

export interface NbaLegacyBoxScoreStatsStat {
  value: string;
  players: NbaLegacyBoxScoreStatsPlayer[];
}

export interface Leaders {
  points: NbaLegacyBoxScoreStatsStat;
  rebounds: NbaLegacyBoxScoreStatsStat;
  assists: NbaLegacyBoxScoreStatsStat;
}

export interface NbaLegacyBoxScoreStats {
  fastBreakPoints: string;
  pointsInPaint: string;
  biggestLead: string;
  secondChancePoints: string;
  pointsOffTurnovers: string;
  longestRun: string;
  totals: Totals;
  leaders: Leaders;
}

export interface NbaLegacyBoxScoreActivePlayer {
  personId: string;
  firstName: string;
  lastName: string;
  jersey: string;
  teamId: string;
  isOnCourt: boolean;
  points: string;
  pos: string;
  position_full: string;
  player_code: string;
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
  sortKey: {
    name: number;
    pos: number;
    points: number;
    min: number;
    fgm: number;
    fga: number;
    fgp: number;
    ftm: number;
    fta: number;
    ftp: number;
    tpm: number;
    tpa: number;
    tpp: number;
    offReb: number;
    defReb: number;
    totReb: number;
    assists: number;
    pFouls: number;
    steals: number;
    turnovers: number;
    blocks: number;
    plusMinus: number;
  };
}
