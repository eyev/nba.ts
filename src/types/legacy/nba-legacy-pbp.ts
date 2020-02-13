import { NbaLegacyInternal } from "./nba-legacy-internal";

export interface NbaLegacyPbp {
  _internal: NbaLegacyInternal;
  plays: {
    clock: string;
    eventMsgType: string;
    description: string;
    personId: string;
    teamId: string;
    vTeamScore: string;
    hTeamScore: string;
    isScoreChange: boolean;
    isVideoAvailable: boolean;
    formatted: {
      description: string;
    }
  }[];
}
