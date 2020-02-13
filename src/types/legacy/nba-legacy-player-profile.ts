import { NbaLegacyInternal } from "./nba-legacy-internal";

export interface NbaLegacyPlayerProfile {
  _internal: NbaLegacyInternal;
  league: {
    standard: {
      teamId: string;
      stats: {
        latest: NbaLegacyPlayerProfileStats;
        careerSummary: NbaLegacyPlayerProfileStats;
        regularSeason: NbaLegacyPlayerProfileRegularSeason[];
      }
    }
  }
}

export interface NbaLegacyPlayerProfileStats {
  seasonYear: number;
  seasonStageId: number;
  apg: string;
  assists: string;
  blocks: string;
  bpg: string;
  dd2: string;
  defReb: string;
  fga: string;
  fgm: string;
  fgp: string;
  fta: string;
  ftm: string;
  ftp: string;
  gamesPlayed: string;
  gamesStarted: string;
  min: string;
  mpg: string;
  offReb: string;
  pFouls: string;
  plusMinus: string;
  points: string;
  ppg: string;
  rpg: string;
  spg: string;
  steals: string;
  td3: string;
  topg: string;
  totReb: string;
  tpa: string;
  tpm: string;
  tpp: string;
  turnovers: string;
}

export interface NbaLegacyPlayerProfileRegularSeasonTotal extends NbaLegacyPlayerProfileStats {
  teamId: string;
}

export interface NbaLegacyPlayerProfileRegularSeason {
  seasonYear: number;
  teams: NbaLegacyPlayerProfileStats[];
  total: NbaLegacyPlayerProfileRegularSeasonTotal;
}
