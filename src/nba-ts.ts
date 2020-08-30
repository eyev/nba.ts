import { AbortController } from 'abort-controller';
import { Observable, throwError } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { root } from 'rxjs/internal-compatibility';
import { catchError, map, switchMap } from 'rxjs/operators';

import { FETCH_OPTIONS } from './config/fetch-options';
import { ROUTES } from './config/routes';
import { NbaLegacyBoxScore } from './types/legacy/nba-legacy-boxscore';
import { NbaLegacyCalendar } from './types/legacy/nba-legacy-calendar';
import { NbaLegacyPbp } from './types/legacy/nba-legacy-pbp';
import { NbaLegacyPlayers } from './types/legacy/nba-legacy-player';
import { NbaLegacyPlayerProfile } from './types/legacy/nba-legacy-player-profile';
import { NbaLegacyScoreboard } from './types/legacy/nba-legacy-scoreboard';
import { createCalendar, createCurrentCalendar, NbaCalendar } from './types/nba-calendar';
import { createNbaGame, NbaGame } from './types/nba-game';
import { createNbaPlayByPlay, NbaPlayByPlay } from './types/nba-play-by-play';
import { createNbaPlayerProfile, NbaPlayerProfile } from './types/nba-player-profile';
import {
  createNbaPlayerById,
  createNbaPlayers,
  createNbaPlayersByTeamId,
  NbaPlayer,
} from './types/nba-players';
import { createScoreBoard, NbaScoreboardGame } from './types/nba-scoreboard';

const fetch = require('node-fetch');

root.fetch = fetch;
root.AbortController = AbortController;

function get<T>(url: string): Observable<T> {
  return fromFetch(url, FETCH_OPTIONS).pipe(
    switchMap(response => (response.ok ? response.json() : throwError(response))),
    catchError(err => throwError(err)),
  );
}

export namespace Nba {
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

export namespace NbaPromise {
  /**
   * Calendar - retrieve list of games currently being spit out by NBA api
   */
  export function calendar(): Promise<NbaCalendar[]> {
    return Nba.calendar().toPromise();
  }

  /**
   * currentYearCalendar - same as Calendar, however only returns dates for current season (based on nba start/end date)
   */
  export function currentYearCalendar(): Promise<NbaCalendar[]> {
    return Nba.currentYearCalendar().toPromise();
  }

  /**
   * Scoreboard - Box scores for specific date
   * also includes metadata such as broadcasters, national/local tv & radio coverage
   * @param date {string} YYYYMMDD
   */
  export function scoreboard(date: string): Promise<NbaScoreboardGame[]> {
    return Nba.scoreboard(date).toPromise();
  }

  /**
   *  Game Detail
   * @param date
   * @param id
   */

  export function game(date: string, id: string): Promise<NbaGame> {
    return Nba.game(date, id).toPromise();
  }

  /**
   * Players - gets a raw list of all players in the NBA for a specific year
   * @param year YYYY
   */
  export function players(year: string): Promise<NbaPlayer[]> {
    return Nba.players(year).toPromise();
  }

  /**
   * Players - gets a raw list of all players in the NBA for a specific year
   * @param year YYYY
   * @param id
   */
  export function playerById(year: string, id: string): Promise<NbaPlayer> {
    return Nba.playerById(year, id).toPromise();
  }

  export function playersByTeamId(year: string, teamId: string): Promise<NbaPlayer[]> {
    return Nba.playersByTeamId(year, teamId).toPromise();
  }

  /**
   * @param year YYYY
   * @param id
   */
  export function playerProfile(year: string, id: string): Promise<NbaPlayerProfile> {
    return Nba.playerProfile(year, id).toPromise();
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
    return Nba.playByPlay(date, gameId, quarter).toPromise();
  }
}

export { NbaCalendar, NbaGame, NbaPlayByPlay, NbaPlayer, NbaPlayerProfile, NbaScoreboardGame };
