import { TEAMS, NbaTeam } from './config/nba-teams';

export function fromYYYYMMDDToDate(id: string): Date {
  const year = id.substring(0, 4);
  const month = id.substring(4, 6);
  const day = id.substring(6, 8);
  if (!year || !month || !day) {
    throw new Error('Unable to parse date');
  }

  return new Date(+year, +month - 1, +day);
}

export function getTeam(teamId: string): NbaTeam {
  const team = TEAMS.find(t => t.teamId === teamId);

  if (!team) {
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
      },
    };
  }

  return team;
}
