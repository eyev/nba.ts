import { NbaLegacyPlayerProfile, NbaLegacyPlayerProfileStats, NbaLegacyPlayerProfileRegularSeason } from "./legacy/nba-legacy-player-profile";
import { getTeam } from "./nba-players";

export interface NbaPlayerProfile {
  teamId: string;
  teamName: string;
  teamTriCode: string;
  latest: NbaLegacyPlayerProfileStats;
  career: NbaLegacyPlayerProfileStats;
  regularSeason: NbaLegacyPlayerProfileRegularSeason[];
}

export function createNbaPlayerProfile(player: NbaLegacyPlayerProfile): NbaPlayerProfile {
 return {
  teamId: player.league.standard.teamId,
  teamName: getTeam(player.league.standard.teamId).fullName,
  teamTriCode: getTeam(player.league.standard.teamId).tricode,
  latest: player.league.standard.stats.latest,
  regularSeason: player.league.standard.stats.regularSeason,
  career: player.league.standard.stats.careerSummary,
 }
}
