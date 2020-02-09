import { fromYYYYMMDDToDate } from '../utils'
import { NbaLegacyCalendar } from './nba-legacy-calendar'

export interface NbaCalendar {
  id: string // YYYYMMDD
  games: number
  date: Date
}

export function createCalendar(calendar: NbaLegacyCalendar): NbaCalendar[] {
  if (!calendar) {
    throw new Error('Unable to get response')
  }
  // scrap internal, has no value.
  delete calendar._internal

  return Object.entries(calendar).map<NbaCalendar>(games => ({
    id: games[0],
    games: +games[1],
    date: fromYYYYMMDDToDate(games[0])
  })).filter(calendar => calendar.games !== 0)
}

export function createCurrentCalendar(calendar: NbaLegacyCalendar): NbaCalendar[] {
  if (!calendar) {
    throw new Error('Unable to get response')
  }
  // scrap internal, has no value.
  delete calendar._internal

  const currentSeason = Object.entries(calendar).map<NbaCalendar>(games => ({
    id: games[0],
    games: +games[1],
    date: fromYYYYMMDDToDate(games[0])
  }));
  const currentSeasonStartIndex = currentSeason.findIndex(g => g.id === calendar.startDateCurrentSeason);
  const currentSeasonEndIndex = currentSeason.findIndex(g => g.id === calendar.endDate);

  currentSeason.splice(0, currentSeasonStartIndex);
  currentSeason.splice(currentSeasonEndIndex, currentSeason.length - currentSeasonEndIndex);
  return currentSeason;
}
