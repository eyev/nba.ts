import { Observable, throwError, of } from 'rxjs'
import { fromFetch } from 'rxjs/fetch'
import { root } from 'rxjs/internal-compatibility'
import { map, switchMap, catchError } from 'rxjs/operators'

import { ROUTES } from './config/routes'
import { NbaLegacyCalendar } from './types/nba-legacy-calendar'
import { FETCH_OPTIONS } from './config/fetch-options'
import { AbortController } from 'abort-controller'
import { NbaLegacyScoreboard } from './types/nba-legacy-scoreboard'
import { NbaScoreboardGame, createScoreBoard } from './types/nba-scoreboard'
import { NbaCalendar, createCalendar, createCurrentCalendar } from './types/nba-calendar'
const fetch = require('node-fetch')

root.fetch = fetch
root.AbortController = AbortController

export function heyworld(): string {
  return 'Hello World!'
}

function get<T>(url: string): Observable<T> {
  return fromFetch(url, FETCH_OPTIONS).pipe(
    switchMap(response => response.ok ? response.json() : throwError(response)),
    catchError(err => throwError(err)
    )
  )
}

export namespace Nba {
  /**
   * Calendar - retrieve list of games currently being spit out by NBA api
   */
  export function calendar(): Observable<NbaCalendar[]> {
    return get<NbaLegacyCalendar>(`${ROUTES.data}/data/10s/prod/v1/calendar.json`).pipe(map(calendar => createCalendar(calendar)))
  }

  /**
   * currentYearCalendar - same as Calendar, however only returns dates for current season (based on nba start/end date)
   */
  export function currentYearCalendar(): Observable<NbaCalendar[]> {
    return get<NbaLegacyCalendar>(`${ROUTES.data}/data/10s/prod/v1/calendar.json`).pipe(map(calendar => createCurrentCalendar(calendar)))
  }

  /**
   * Scoreboard - Box scores for specific date
   * also includes metadata such as broadcasters, national/local tv & radio coverage
   * @param date {string} YYYYMMDD
   */
  export function scoreboard(date: string): Observable<NbaScoreboardGame[]> {
    return get<NbaLegacyScoreboard>(`${ROUTES.data}/data/10s/prod/v1/${date}/scoreboard.json`).pipe(map(scoreboard => createScoreBoard(scoreboard)))
  }
}

