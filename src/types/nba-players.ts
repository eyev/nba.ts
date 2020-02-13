import { NbaLegacyPlayers, NbaLegacyPlayerTeam } from "./legacy/nba-legacy.player";
import { TEAMS } from "../config/nba-teams";

export interface NbaPlayer {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  position: string;
  number: string;
  isActive: boolean;
  height: string;
  weight: string;
  dateOfBirth: string;
  country: string;
  teamId: string;
  teams: NbaPlayerTeam[];
  draft: NbaPlayerDraft;
  debutYear: string;
  yearsPro: string;
  college: string;
}

export interface NbaPlayerTeam {
  id: string;
  teamName: string;
  teamTriCode: string;
  start: string;
  end: string;
}

export interface NbaPlayerDraft {
  teamId: string;
  pick: string;
  round: string;
  year: string;
}


export function createNbaPlayers(players: NbaLegacyPlayers): NbaPlayer[] {
  if (!players) {
    throw new Error('Unable to get response')
  }

  return players.league.standard.map(player => ({
    id: player.personId,
    college: (player.collegeName === '' || player.collegeName ===  'No College') ? player.lastAffiliation : player.collegeName,
    country: player.country,
    dateOfBirth: player.dateOfBirthUTC,
    debutYear: player.nbaDebutYear,
    draft: {
      teamId: player.draft.teamId,
      pick: player.draft.pickNum,
      round: player.draft.roundNum,
      year: player.draft.seasonYear
    },
    firstName: player.firstName,
    fullName: `${player.firstName} ${player.lastName}`,
    height: `${player.heightFeet}' ${player.heightInches}"`,
    isActive: player.isActive,
    lastName: player.lastName,
    number: player.jersey,
    position: player.pos,
    teamId: player.teamId,
    teams: createPlayerTeams(player.teams),
    weight: player.weightPounds,
    yearsPro: player.yearsPro,
  }))
}

function createPlayerTeams(teams: NbaLegacyPlayerTeam[]): NbaPlayerTeam[] {
  return teams.map(team => ({
    id: team.teamId,
    start: team.seasonStart,
    end: team.seasonEnd,
    teamName: getTeam(team.teamId).fullName,
    teamTriCode: getTeam(team.teamId).tricode,
  }))
}

export function getTeam(teamId: string) {
  const team = TEAMS.find(t => t.teamId === teamId);

  if(!team) {
    return {
      teamId: '',
      tricode: 'NA',
      fullName: 'N/A',
      moniker: '',
      primaryColor: '',
      secondaryColor: '',
      web: {
        homepage: '',
        tickets: '',
      }
    }
  }

  return team;
}

export function createNbaPlayerById(players: NbaLegacyPlayers, id: string): NbaPlayer {
  if (!players) {
    throw new Error('Unable to get response')
  }

  const player = players.league.standard.find(p => p.personId === id);

  if(!player) {
    throw new Error('Unable to find player.');
  }

  return {
    id: player.personId,
    college: (player.collegeName === '' || player.collegeName ===  'No College') ? player.lastAffiliation : player.collegeName,
    country: player.country,
    dateOfBirth: player.dateOfBirthUTC,
    debutYear: player.nbaDebutYear,
    draft: {
      teamId: player.draft.teamId,
      pick: player.draft.pickNum,
      round: player.draft.roundNum,
      year: player.draft.seasonYear
    },
    firstName: player.firstName,
    fullName: `${player.firstName} ${player.lastName}`,
    height: `${player.heightFeet}' ${player.heightInches}"`,
    isActive: player.isActive,
    lastName: player.lastName,
    number: player.jersey,
    position: player.pos,
    teamId: player.teamId,
    teams: createPlayerTeams(player.teams),
    weight: player.weightPounds,
    yearsPro: player.yearsPro,
  }
}

export function createNbaPlayersByTeamId(players: NbaLegacyPlayers, teamId: string): NbaPlayer[] {
  if (!players) {
    throw new Error('Unable to get response')
  }

  const teamPlayers = players.league.standard.filter(p => p.teamId === teamId);

  if(!players) {
    throw new Error('Unable to find players.');
  }
  return teamPlayers.map(player => ({
    id: player.personId,
    firstName: player.firstName,
    lastName: player.lastName,
    fullName: `${player.firstName} ${player.lastName}`,
    position: player.pos,
    number: player.jersey,
    height: `${player.heightFeet}' ${player.heightInches}"`,
    weight: player.weightPounds,
    dateOfBirth: player.dateOfBirthUTC,
    country: player.country,
    debutYear: player.nbaDebutYear,
    yearsPro: player.yearsPro,
    isActive: player.isActive,
    teamId: player.teamId,
    college: (player.collegeName === '' || 'No College') ? player.lastAffiliation : player.collegeName,
    teams: createPlayerTeams(player.teams),
    draft: {
      teamId: player.draft.teamId,
      pick: player.draft.pickNum,
      round: player.draft.roundNum,
      year: player.draft.seasonYear
    }
  }));

}
