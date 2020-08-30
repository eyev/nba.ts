import {
  createNbaPlayerById,
  createNbaPlayers,
  createNbaPlayersByTeamId,
  getCollegeOrAffiliation,
} from '../../src/types/nba-players';
import {
  KYRIE_IRVING,
  LEBRON_JAMES,
  NBA_LEGACY_PLAYERS_RESPONSE,
  NBA_PLAYERS_EMPTY,
} from '../data/nba-legacy-players-response';
import {
  NBA_PLAYER_BY_ID_RESPONSE,
  NBA_PLAYER_BY_TEAM_ID_RESPONSE,
  NBA_PLAYERS_RESPONSE,
} from '../data/nba-players-response';

describe('NbaPlayers', () => {
  describe('createNbaPlayers()', () => {
    test('converts legacy response to NbaPlayer[] response', () =>
      expect(createNbaPlayers(NBA_LEGACY_PLAYERS_RESPONSE)).toStrictEqual(NBA_PLAYERS_RESPONSE));

    test('throws error if no players are provided', () =>
      expect(() => createNbaPlayers(NBA_PLAYERS_EMPTY)).toThrow());
  });

  describe('createNbaPlayerById()', () => {
    test('Returns a player (NbaPlayer) by ID', () =>
      expect(createNbaPlayerById(NBA_LEGACY_PLAYERS_RESPONSE, '200746')).toStrictEqual(
        NBA_PLAYER_BY_ID_RESPONSE,
      ));

    test('Throws error if it cannot find player with matching id', () =>
      expect(() => createNbaPlayerById(NBA_LEGACY_PLAYERS_RESPONSE, '1')).toThrow());

    test('Throws error if there are no players to search', () =>
      expect(() => createNbaPlayerById(NBA_PLAYERS_EMPTY, '1')).toThrow());
  });

  describe('createNbaPlayersByTeamId()', () => {
    test('Returns list of players by team id', () =>
      expect(createNbaPlayersByTeamId(NBA_LEGACY_PLAYERS_RESPONSE, '1610612748')).toStrictEqual(
        NBA_PLAYER_BY_TEAM_ID_RESPONSE,
      ));

    test('Throws error if no players to search', () =>
      expect(() => createNbaPlayersByTeamId(NBA_PLAYERS_EMPTY, '1')).toThrow());
  });

  describe('getCollegeOrAffiliation()', () => {
    expect(getCollegeOrAffiliation(LEBRON_JAMES)).toEqual('St. Vincent-St. Mary HS (OH)/USA');
    expect(getCollegeOrAffiliation(KYRIE_IRVING)).toEqual('Duke');
  });
});
