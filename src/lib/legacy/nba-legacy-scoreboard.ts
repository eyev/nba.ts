import { NbaLegacyInternal } from './nba-legacy-internal';

export interface NbaLegacyScoreboard {
  _internal: NbaLegacyInternal;
  numGames: string;
  games: NbaLegacyScoreboardGame[];
}

export interface NbaLegacyScoreboardGame {
  seasonStageId: number;
  seasonYear: string;
  leagueName: string;
  gameId: string;
  arena: NbaLegacyScoreboardArena;
  isGameActivated: boolean;
  statusNum: number;
  extendedStatusNum: number;
  startTimeEastern: string;
  startTimeUtc: Date;
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
  nugget: { text: string };
  attendance: string;
  tickets: NbaLegacyScoreboardTickets;
  hasGameBookPdf: boolean;
  isStartTimeTBD: boolean;
  gameDuration: NbaLegacyScoreboardGameDuration;
  period: NbaLegacyScoreboardPeriod;
  vTeam: NbaLegacyScoreboardTeam;
  hTeam: NbaLegacyScoreboardTeam;
  watch: {
    broadcast: {
      broadcasters: NbaLegacyScoreboardBroadcasters;
    };
    video: NbaLegacyScoreboardVideo;
    audio: {
      national: NbaLegacyScoreboardAudio;
      vTeam: NbaLegacyScoreboardAudio;
      hTeam: NbaLegacyScoreboardAudio;
    };
  };
}

interface NbaLegacyScoreboardArena {
  name: string;
  isDomestic: boolean;
  city: string;
  stateAbbr: string;
  country: string;
}

interface NbaLegacyScoreboardTickets {
  mobileApp: string;
  desktopWeb: string;
  mobileWeb: string;
  leagGameInfo: string;
  leagTix: string;
}

interface NbaLegacyScoreboardGameDuration {
  hours: string;
  minutes: string;
}

interface NbaLegacyScoreboardPeriod {
  current: number;
  type: number;
  maxRegular: number;
  isHalftime: boolean;
  isEndOfPeriod: boolean;
}

interface NbaLegacyScoreboardLinescore {
  score: string;
}

export interface NbaLegacyScoreboardTeam {
  teamId: string;
  triCode: string;
  win: string;
  loss: string;
  seriesWin: string;
  seriesLoss: string;
  score: string;
  linescore: NbaLegacyScoreboardLinescore[];
}

interface NbaLegacyScoreboardBroadcaster {
  shortName: string;
  longName: string;
}

interface NbaLegacyScoreboardBroadcasters {
  national: NbaLegacyScoreboardBroadcaster[];
  canadian: NbaLegacyScoreboardBroadcaster[];
  vTeam: NbaLegacyScoreboardBroadcaster[];
  hTeam: NbaLegacyScoreboardBroadcaster[];
  spanish_hTeam: NbaLegacyScoreboardBroadcaster[];
  spanish_vTeam: NbaLegacyScoreboardBroadcaster[];
  spanish_national: NbaLegacyScoreboardBroadcaster[];
}

interface NbaLegacyScoreboardVideoStream {
  streamType: string;
  isOnAir: boolean;
  doesArchiveExist: boolean;
  isArchiveAvailToWatch: boolean;
  streamId: string;
  duration: number;
}

interface NbaLegacyScoreboardDeepLink {
  broadcaster: string;
  regionalMarketCodes: string;
  iosApp: string;
  androidApp: string;
  desktopWeb: string;
  mobileWeb: string;
}

interface NbaLegacyScoreboardVideo {
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
  streams: NbaLegacyScoreboardVideoStream[];
  deepLink: NbaLegacyScoreboardDeepLink[];
}

interface NbaLegacyScoreboardAudioStream {
  language: string;
  isOnAir: boolean;
  streamId: string;
}

interface NbaLegacyScoreboardAudio {
  streams: NbaLegacyScoreboardAudioStream[];
  broadcasters: NbaLegacyScoreboardBroadcaster[];
}
