import { NbaLegacyInternal } from "./nba-legacy-internal";

export interface NbaLegacyCalendar {
  [key: string]: string | NbaLegacyInternal;
  _internal: NbaLegacyInternal;
}
