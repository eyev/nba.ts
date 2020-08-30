import { NbaLegacyInternal } from './nba-legacy-internal';

export interface NbaLegacyCalendar {
  [key: string]: string;
  startDate: string;
  endDate: string;
  startDateCurrentSeason: string;
}
