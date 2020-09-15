import { NbaCalendar } from '../nba-ts';
import { fromYYYYMMDDToDate } from '../utils';
import { NbaLegacyCalendar } from './legacy/nba-legacy-calendar';

export function createCalendar(calendar: NbaLegacyCalendar): NbaCalendar[] {
  if (!calendar) {
    throw new Error('Unable to get response');
  }
  // scrap internal, has no value.
  delete calendar._internal;

  return Object.entries(calendar)
    .map<NbaCalendar>(games => ({
      id: games[0],
      games:
        games[0] !== ('startDate' || 'endDate' || 'startDateCurrentSeason')
          ? +(games[1] as string)
          : 0,
      date:
        games[0] !== ('startDate' || 'endDate' || 'startDateCurrentSeason')
          ? fromYYYYMMDDToDate(games[0])
          : fromYYYYMMDDToDate(games[1] as string),
    }))
    .filter(
      calendar =>
        calendar.games !== 0 &&
        calendar.id !== ('startDate' || 'endDate' || 'startDateCurrentSeason'),
    );
}

export function createCurrentCalendar(calendar: NbaLegacyCalendar): NbaCalendar[] {
  if (!calendar) {
    throw new Error('Unable to get response');
  }
  // scrap internal, has no value.
  delete calendar._internal;
  delete calendar.startDate;
  delete calendar.endDate;
  delete calendar.startDateCurrentSeason;

  const currentSeason = Object.entries(calendar).map<NbaCalendar>(games => ({
    id: games[0],
    games: +(games[1] as string),
    date: fromYYYYMMDDToDate(games[0]),
  }));
  const currentSeasonStartIndex = currentSeason.findIndex(
    g => g.id === calendar.startDateCurrentSeason,
  );
  const currentSeasonEndIndex = currentSeason.findIndex(g => g.id === calendar.endDate);

  currentSeason.splice(0, currentSeasonStartIndex);
  currentSeason.splice(currentSeasonEndIndex, currentSeason.length - currentSeasonEndIndex);
  return currentSeason;
}
