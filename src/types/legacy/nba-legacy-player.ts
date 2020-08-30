import { NbaLegacyInternal } from './nba-legacy-internal';

export interface NbaLegacyPlayers {
  _internal: NbaLegacyInternal;
  league: {
    standard: NbaLegacyPlayer[];
    africa: NbaLegacyPlayer[];
    sacrammento: NbaLegacyPlayer[];
    vegas: NbaLegacyPlayer[];
    utah: NbaLegacyPlayer[];
  };
}
interface NbaLegacyPlayerTeamSitesOnly {
  playerCode: string;
  posFull: string;
  displayAffiliation: string;
  freeAgentCode: string;
}

export interface NbaLegacyPlayerTeam {
  teamId: string;
  seasonStart: string;
  seasonEnd: string;
}

interface NbaLegacyPlayerDraft {
  teamId: string;
  pickNum: string;
  roundNum: string;
  seasonYear: string;
}

export interface NbaLegacyPlayer {
  firstName: string;
  lastName: string;
  temporaryDisplayName: string;
  personId: string;
  teamId: string;
  jersey: string;
  isActive: boolean;
  pos: string;
  heightFeet: string;
  heightInches: string;
  heightMeters: string;
  weightPounds: string;
  weightKilograms: string;
  dateOfBirthUTC: string;
  teamSitesOnly: NbaLegacyPlayerTeamSitesOnly;
  teams: NbaLegacyPlayerTeam[];
  draft: NbaLegacyPlayerDraft;
  nbaDebutYear: string;
  yearsPro: string;
  collegeName: string;
  lastAffiliation: string;
  country: string;
}
