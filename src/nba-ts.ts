import { AbortController } from 'abort-controller';
import { FETCH_OPTIONS } from 'config/fetch-options';
import { ROUTES } from 'config/routes';
import { Observable, throwError } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { root } from 'rxjs/internal-compatibility';
import { catchError, map, switchMap } from 'rxjs/operators';

import { NbaLegacyBoxScore } from './lib/legacy/nba-legacy-boxscore';
import { NbaLegacyCalendar } from './lib/legacy/nba-legacy-calendar';
import { NbaLegacyPbp } from './lib/legacy/nba-legacy-pbp';
import { NbaLegacyPlayers } from './lib/legacy/nba-legacy-player';
import {
  NbaLegacyPlayerProfile,
  NbaLegacyPlayerProfileRegularSeason,
  NbaLegacyPlayerProfileStats,
} from './lib/legacy/nba-legacy-player-profile';
import { NbaLegacyScoreboard } from './lib/legacy/nba-legacy-scoreboard';
import { createCalendar, createCurrentCalendar } from './lib/nba-calendar';
import { createNbaGame } from './lib/nba-game';
import { createNbaPlayByPlay } from './lib/nba-play-by-play';
import { createNbaPlayerProfile } from './lib/nba-player-profile';
import { createNbaPlayerById, createNbaPlayers, createNbaPlayersByTeamId } from './lib/nba-players';
import { createScoreBoard, NbaScoreboardGame } from './lib/nba-scoreboard';

const fetch = require('node-fetch');

root.fetch = fetch;
root.AbortController = AbortController;

function get<T>(url: string): Observable<T> {
  return fromFetch(url, FETCH_OPTIONS).pipe(
    switchMap(response => (response.ok ? response.json() : throwError(response))),
    catchError(err => throwError(err)),
  );
}

export namespace NbaRx {
  /**
   * Calendar - retrieve list of games currently being spit out by NBA api
   */
  export function calendar(): Observable<NbaCalendar[]> {
    return get<NbaLegacyCalendar>(`${ROUTES.data}/data/10s/prod/v1/calendar.json`).pipe(
      map(calendar => createCalendar(calendar)),
    );
  }

  /**
   * currentYearCalendar - same as Calendar, however only returns dates for current season (based on nba start/end date)
   */
  export function currentYearCalendar(): Observable<NbaCalendar[]> {
    return get<NbaLegacyCalendar>(`${ROUTES.data}/data/10s/prod/v1/calendar.json`).pipe(
      map(calendar => createCurrentCalendar(calendar)),
    );
  }

  /**
   * Scoreboard - Box scores for specific date
   * also includes metadata such as broadcasters, national/local tv & radio coverage
   * @param date {string} YYYYMMDD
   */
  export function scoreboard(date: string): Observable<NbaScoreboardGame[]> {
    return get<NbaLegacyScoreboard>(`${ROUTES.data}/data/10s/prod/v1/${date}/scoreboard.json`).pipe(
      map(scoreboard => createScoreBoard(scoreboard)),
    );
  }

  /**
   *  Game Detail
   * @param date
   * @param id
   */

  export function game(date: string, id: string): Observable<NbaGame> {
    return get<NbaLegacyBoxScore>(
      `${ROUTES.data}/data/10s/prod/v1/${date}/${id}_boxscore.json`,
    ).pipe(map(game => createNbaGame(game)));
  }

  /**
   * Players - gets a raw list of all players in the NBA for a specific year
   * @param year YYYY
   */
  export function players(year: string): Observable<NbaPlayer[]> {
    return get<NbaLegacyPlayers>(`${ROUTES.data}/data/10s/prod/v1/${year}/players.json`).pipe(
      map(players => createNbaPlayers(players)),
    );
  }

  /**
   * Players - gets a raw list of all players in the NBA for a specific year
   * @param year YYYY
   * @param id
   */
  export function playerById(year: string, id: string): Observable<NbaPlayer> {
    return get<NbaLegacyPlayers>(`${ROUTES.data}/data/10s/prod/v1/${year}/players.json`).pipe(
      map(players => createNbaPlayerById(players, id)),
    );
  }

  export function playersByTeamId(year: string, teamId: string): Observable<NbaPlayer[]> {
    return get<NbaLegacyPlayers>(`${ROUTES.data}/data/10s/prod/v1/${year}/players.json`).pipe(
      map(players => createNbaPlayersByTeamId(players, teamId)),
    );
  }

  /**
   * @param year YYYY
   * @param id
   */
  export function playerProfile(year: string, id: string): Observable<NbaPlayerProfile> {
    return get<NbaLegacyPlayerProfile>(
      `${ROUTES.data}/data/10s/prod/v1/${year}/players/${id}_profile.json`,
    ).pipe(map(player => createNbaPlayerProfile(player)));
  }

  /**
   * @param date YYYYMMDD
   * @param gameId
   * @param quarter
   */
  export function playByPlay(
    date: string,
    gameId: string,
    quarter: string,
  ): Observable<NbaPlayByPlay[]> {
    return get<NbaLegacyPbp>(
      `${ROUTES.data}/data/10s/prod/v1/${date}/${gameId}_pbp_${quarter}.json`,
    ).pipe(map(pbp => createNbaPlayByPlay(pbp)));
  }
}

export namespace Nba {
  /**
   * Calendar - retrieve list of games currently being spit out by NBA api
   */
  export function calendar(): Promise<NbaCalendar[]> {
    return NbaRx.calendar().toPromise();
  }

  /**
   * currentYearCalendar - same as Calendar, however only returns dates for current season (based on nba start/end date)
   */
  export function currentYearCalendar(): Promise<NbaCalendar[]> {
    return NbaRx.currentYearCalendar().toPromise();
  }

  /**
   * Scoreboard - Box scores for specific date
   * also includes metadata such as broadcasters, national/local tv & radio coverage
   * @param date {string} YYYYMMDD
   */
  export function scoreboard(date: string): Promise<NbaScoreboardGame[]> {
    return NbaRx.scoreboard(date).toPromise();
  }

  /**
   *  Game Detail
   * @param date
   * @param id
   */

  export function game(date: string, id: string): Promise<NbaGame> {
    return NbaRx.game(date, id).toPromise();
  }

  /**
   * Players - gets a raw list of all players in the NBA for a specific year
   * @param year YYYY
   */
  export function players(year: string): Promise<NbaPlayer[]> {
    return NbaRx.players(year).toPromise();
  }

  /**
   * Players - gets a raw list of all players in the NBA for a specific year
   * @param year YYYY
   * @param id
   */
  export function playerById(year: string, id: string): Promise<NbaPlayer> {
    return NbaRx.playerById(year, id).toPromise();
  }

  export function playersByTeamId(year: string, teamId: string): Promise<NbaPlayer[]> {
    return NbaRx.playersByTeamId(year, teamId).toPromise();
  }

  /**
   * @param year YYYY
   * @param id
   */
  export function playerProfile(year: string, id: string): Promise<NbaPlayerProfile> {
    return NbaRx.playerProfile(year, id).toPromise();
  }

  /**
   * @param date YYYYMMDD
   * @param gameId
   * @param quarter
   */
  export function playByPlay(
    date: string,
    gameId: string,
    quarter: string,
  ): Promise<NbaPlayByPlay[]> {
    return NbaRx.playByPlay(date, gameId, quarter).toPromise();
  }
}

// interfaces
export interface NbaCalendar {
  id: string; // YYYYMMDD
  games: number;
  date: Date;
}
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
export interface NbaPlayerProfile {
  teamId: string;
  teamName: string;
  teamTriCode: string;
  latest: NbaLegacyPlayerProfileStats;
  career: NbaLegacyPlayerProfileStats;
  regularSeason: NbaLegacyPlayerProfileRegularSeason[];
}

export interface NbaPlayer {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  position: string;
  number: string;
  isActive: boolean;
  height: string;
  weight: string;
  dateOfBirth: string;
  country: string;
  teamId: string;
  teams: NbaPlayerTeam[];
  draft: NbaPlayerDraft;
  debutYear: string;
  yearsPro: string;
  college: string;
}

export interface NbaPlayerTeam {
  id: string;
  teamName: string;
  teamTriCode: string;
  start: string;
  end: string;
}

export interface NbaPlayerDraft {
  teamId: string;
  pick: string;
  round: string;
  year: string;
}
