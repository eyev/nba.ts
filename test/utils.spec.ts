import { getTeam, fromYYYYMMDDToDate } from '../src/utils';
import { NBA_TEAM } from './data/nba-players-response';

describe('utils', () => {
  describe('fromYYYYMMDDToDate()', () => {
    test('Get team returns correct team', () =>
      expect(fromYYYYMMDDToDate('20191211')).toStrictEqual(new Date(2019, 11, 11)));

    test('Throws if invalid format is passed', () =>
      expect(() => fromYYYYMMDDToDate('2019')).toThrow());
  });

  describe('getTeam()', () => {
    test('Get team returns correct team', () =>
      expect(getTeam('1610612739')).toStrictEqual(NBA_TEAM));

    test('Returns empty object if no team matches', () =>
      expect(getTeam('1')).toStrictEqual({
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
      }));
  });
});
